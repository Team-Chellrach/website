'use client'

import { useEffect, useRef, useState } from 'react'

const STAGES = [
  { name: 'Plan', what: 'discovery · backlog · architecture' },
  { name: 'Build', what: 'agile sprints · code review · tests' },
  { name: 'Provision', what: 'cloud foundations · infrastructure as code · application platforms' },
  { name: 'Secure', what: 'image scan · secrets · policy checks' },
  { name: 'Deploy', what: 'CI/CD · GitOps · safe rollbacks' },
  { name: 'Operate', what: 'telemetry · SLOs · autoscaling' },
]

// Calm pace: a stage every 1.8s, then a pause on the feedback loop.
const STEP_MS = 1800
const HOLD_MS = 4000

// An illustration of how we deliver, not a live system: each stage highlights
// in turn, then Operate feeds back into Build. Still for reduced motion.
export default function Lifecycle() {
  const [active, setActive] = useState(-1)
  const [looping, setLooping] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    let timer = 0
    let running = false
    const tick = () => {
      if (i < STAGES.length) {
        setLooping(false)
        setActive(i++)
        timer = window.setTimeout(tick, STEP_MS)
      } else {
        setLooping(true)
        setActive(1)
        i = 0
        timer = window.setTimeout(tick, HOLD_MS)
      }
    }
    // Only cycles while on screen, so it never competes with the section you're reading.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        timer = window.setTimeout(tick, 600)
      } else if (!entry.isIntersecting && running) {
        running = false
        window.clearTimeout(timer)
      }
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <figure ref={ref} className="m-0 min-w-0 border border-fg bg-bg" aria-label="A typical delivery lifecycle">
      <div className="flex justify-between gap-3 border-b border-line px-5 py-3.5 font-mono text-[12px] text-muted">
        <span>A TYPICAL DELIVERY LIFECYCLE</span>
        <span>idea → production</span>
      </div>
      <ol className="m-0 list-none p-0">
        {STAGES.map((stage, i) => (
          <li
            key={stage.name}
            data-on={i === active}
            data-done={!looping && i < active}
            className="st grid grid-cols-[52px_1fr] border-b border-line"
          >
            <span className="st-n pl-5 pt-[18px] font-mono text-[12px] text-muted">0{i + 1}</span>
            <div className="min-w-0 py-3.5 pr-5">
              <div className="font-display text-[20px] leading-tight">{stage.name}</div>
              <div className="mt-1 font-mono text-[12.5px] leading-normal text-muted">{stage.what}</div>
            </div>
          </li>
        ))}
      </ol>
      <p className={`m-0 flex items-center gap-2.5 px-5 py-3.5 font-mono text-[12px] transition-colors ${looping ? 'text-brand-blue' : 'text-muted'}`}>
        <span aria-hidden="true">↻</span> Operate feeds back into the next sprint
      </p>
    </figure>
  )
}
