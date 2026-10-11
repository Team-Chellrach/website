'use client'

import { useEffect, useRef, useState } from 'react'

const LINES: { prompt?: boolean; text: string; tone?: 'ok' | 'dim'; rest?: string }[] = [
  { prompt: true, text: 'terraform apply' },
  { text: '  Plan: 12 to add, 0 to change, 0 to destroy.', tone: 'dim' },
  { text: '  Apply complete!', tone: 'ok', rest: ' Resources: 12 added.' },
  { prompt: true, text: 'argocd app sync platform' },
  { text: '  Synced · Healthy', tone: 'ok' },
  { prompt: true, text: 'kubectl rollout status deploy/api' },
  { text: '  deployment "api" successfully rolled out', tone: 'ok' },
]

// Example deploy output over the infrastructure photo. Lines appear one by one
// while it is on screen, then replay. Labelled as an example; shown complete
// for reduced motion.
export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(LINES.length)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timers: number[] = []
    let started = false
    const play = () => {
      setAnimating(true)
      setShown(0)
      LINES.forEach((_, k) => timers.push(window.setTimeout(() => setShown(k + 1), 500 + k * 650)))
      timers.push(window.setTimeout(play, 500 + LINES.length * 650 + 5000))
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          play()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      timers.forEach(t => window.clearTimeout(t))
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-label="Example deployment output"
      className={`absolute inset-x-[clamp(16px,4vw,48px)] bottom-[clamp(16px,4vw,48px)] border border-stage-line bg-[rgba(13,15,14,0.9)] px-5 pb-5 pt-[18px] font-mono text-[12.5px] leading-[1.75] text-[#d6ddd4] backdrop-blur-sm ${
        animating ? 'term-ready' : ''
      }`}
    >
      <div className="caps mb-3 flex justify-between text-[10.5px] text-stage-muted">
        <span>Example output</span>
        <span>platform · production</span>
      </div>
      {LINES.map((line, k) => (
        <div key={k} data-on={k < shown} className="term-line whitespace-pre-wrap [overflow-wrap:anywhere]">
          {line.prompt && <span className="text-[#79aee0]">$ </span>}
          <span className={line.tone === 'ok' ? 'text-[#44c4a1]' : line.tone === 'dim' ? 'text-stage-muted' : ''}>{line.text}</span>
          {line.rest}
        </div>
      ))}
    </div>
  )
}
