'use client'

import { useEffect, useRef } from 'react'

type Point = { x: number; y: number }
type Pulse = { from: number; to: number; t: number; speed: number; color: string; prev: number }


type Tone = 'theme' | 'onBrand'

// A faint honeycomb (the hexagon from the logo) with pulses of light moving
// along its edges, like traffic through a platform. Decorative only: it pauses
// off screen and in background tabs, and stays still for reduced motion.
// tone="theme" follows the light/dark palette; "onBrand" is white, for use on
// the blue-green gradient.
export default function HexNetwork({
  tone = 'theme',
  hex: HEX = 34,
  pulses: PULSES = 24,
  className = '',
}: {
  tone?: Tone
  hex?: number
  pulses?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let points: Point[] = []
    let neighbours: number[][] = []
    let pulses: Pulse[] = []
    let frame = 0
    let visible = true
    let last = performance.now()
    let colors = readColors()

    function readColors() {
      if (tone === 'onBrand') return { line: 'rgba(255,255,255,0.16)', blue: '#ffffff', green: '#c8fff0' }
      const style = getComputedStyle(document.documentElement)
      return {
        line: style.getPropertyValue('--line').trim() || '#d9e1e9',
        blue: style.getPropertyValue('--blue').trim() || '#1d70be',
        green: style.getPropertyValue('--green').trim() || '#00a07c',
      }
    }

    // Build a flat-topped honeycomb covering the canvas: shared vertices, deduplicated edges.
    function build(width: number, height: number) {
      const index = new Map<string, number>()
      points = []
      neighbours = []
      const key = (x: number, y: number) => `${Math.round(x)}:${Math.round(y)}`
      const vertex = (x: number, y: number) => {
        const k = key(x, y)
        let i = index.get(k)
        if (i === undefined) {
          i = points.length
          index.set(k, i)
          points.push({ x, y })
          neighbours.push([])
        }
        return i
      }
      const link = (a: number, b: number) => {
        if (!neighbours[a].includes(b)) {
          neighbours[a].push(b)
          neighbours[b].push(a)
        }
      }
      const w = HEX * 1.5
      const h = HEX * Math.sqrt(3)
      for (let col = -1; col * w < width + HEX * 2; col++) {
        for (let row = -1; row * h < height + h; row++) {
          const cx = col * w
          const cy = row * h + (col % 2 ? h / 2 : 0)
          const ring = Array.from({ length: 6 }, (_, k) => {
            const angle = (Math.PI / 3) * k
            return vertex(cx + HEX * Math.cos(angle), cy + HEX * Math.sin(angle))
          })
          ring.forEach((v, k) => link(v, ring[(k + 1) % 6]))
        }
      }
      pulses = Array.from({ length: PULSES }, (_, i) => spawn(i))
    }

    function spawn(i: number): Pulse {
      const from = Math.floor(Math.random() * points.length)
      const options = neighbours[from]
      return {
        from,
        to: options[Math.floor(Math.random() * options.length)],
        t: Math.random(),
        speed: 0.5 + Math.random() * 0.6, // edges per second
        color: i % 2 ? 'green' : 'blue',
        prev: -1,
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(rect.width * dpr)
      canvas!.height = Math.round(rect.height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      build(rect.width, rect.height)
      draw(0)
    }

    function draw(dt: number) {
      const { width, height } = canvas!.getBoundingClientRect()
      ctx!.clearRect(0, 0, width, height)

      ctx!.strokeStyle = colors.line
      ctx!.lineWidth = 1
      ctx!.beginPath()
      neighbours.forEach((list, a) => {
        for (const b of list) {
          if (b > a) {
            ctx!.moveTo(points[a].x, points[a].y)
            ctx!.lineTo(points[b].x, points[b].y)
          }
        }
      })
      ctx!.stroke()

      if (reduceMotion) return
      for (const p of pulses) {
        p.t += p.speed * dt
        while (p.t >= 1) {
          p.t -= 1
          const next = neighbours[p.to].filter(n => n !== p.from)
          p.prev = p.from
          p.from = p.to
          p.to = next[Math.floor(Math.random() * next.length)] ?? p.prev
        }
        const a = points[p.from]
        const b = points[p.to]
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        const color = p.color === 'green' ? colors.green : colors.blue

        // Short trail along the current edge, then the bright head.
        const tail = Math.max(0, p.t - 0.45)
        const gradient = ctx!.createLinearGradient(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail, x, y)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(1, color)
        ctx!.strokeStyle = gradient
        ctx!.lineWidth = 2
        ctx!.beginPath()
        ctx!.moveTo(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail)
        ctx!.lineTo(x, y)
        ctx!.stroke()

        ctx!.fillStyle = color
        ctx!.globalAlpha = 0.25
        ctx!.beginPath()
        ctx!.arc(x, y, 6, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
        ctx!.beginPath()
        ctx!.arc(x, y, 2.4, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      draw(dt)
      frame = requestAnimationFrame(tick)
    }

    function start() {
      if (reduceMotion || frame || !visible || document.hidden) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
    }

    resize()
    start()

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(canvas)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersection.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    // Re-read colours when the theme toggles.
    const themeObserver = new MutationObserver(() => {
      colors = readColors()
      if (!frame) draw(0)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      stop()
      resizeObserver.disconnect()
      intersection.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [tone, HEX, PULSES])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
