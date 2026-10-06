'use client'

import { useEffect, useState } from 'react'
import { CloudIcon, RepeatIcon } from '../icons'

const STAGES = [
  { name: 'Plan', what: 'discovery · backlog · architecture' },
  { name: 'Build', what: 'agile sprints · code review · tests' },
  { name: 'Provision', what: 'cloud foundations · infrastructure as code · application platforms' },
  { name: 'Secure', what: 'image scan · secrets · policy checks' },
  { name: 'Deploy', what: 'CI/CD · GitOps · safe rollbacks' },
  { name: 'Operate', what: 'telemetry · SLOs · autoscaling' },
]

const CLOUDS = ['AWS', 'Azure', 'Google Cloud']

const STEP_MS = 950

// An illustration of how we deliver, not a live system: each stage lights up in
// turn, the clouds light up, then Operate feeds back into the next sprint. It
// renders complete (every stage done) and stays that way when motion is reduced.
export default function Lifecycle() {
  const [active, setActive] = useState(STAGES.length)
  const [lit, setLit] = useState(CLOUDS.length)
  const [looping, setLooping] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timers: number[] = []
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))

    function cycle(start: number) {
      at(start, () => { setLit(0); setLooping(false); setActive(0) })
      for (let i = 1; i <= STAGES.length; i++) at(start + i * STEP_MS, () => setActive(i))
      const end = start + STAGES.length * STEP_MS
      CLOUDS.forEach((_, k) => at(end + 200 + k * 220, () => setLit(k + 1)))
      at(end + 1400, () => { setLooping(true); setActive(1) })
      at(end + 4200, () => cycle(0))
    }
    cycle(2200)
    return () => timers.forEach(t => window.clearTimeout(t))
  }, [])

  const stateOf = (i: number) => (looping && i === 1 ? 'running' : i < active ? 'done' : i === active ? 'running' : 'queued')
  const progress = Math.min(100, ((Math.min(active, STAGES.length - 1) + 1) / STAGES.length) * 100)

  return (
    <figure className="grid min-w-0 gap-2.5">
      <figcaption className="font-mono text-xs uppercase tracking-[0.1em] text-muted">A typical delivery lifecycle</figcaption>
      <div className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(17,24,32,0.35)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-[18px] py-3.5 font-mono text-[13px] text-muted">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full border border-line bg-surface-2" />
            <i className="h-2.5 w-2.5 rounded-full border border-line bg-surface-2" />
            <i className="h-2.5 w-2.5 rounded-full border border-line bg-surface-2" />
          </span>
          <span>idea → production</span>
          <span className="rounded-full bg-brand-green/12 px-2.5 py-1.5 text-xs text-brand-green">{STAGES.length} stages</span>
        </div>
        <div className="h-[3px] bg-surface-2">
          <span className="block h-full bg-gradient-brand transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <ol className="px-[18px] pb-1.5 pt-2.5">
          {STAGES.map((stage, i) => (
            <li
              key={stage.name}
              data-state={stateOf(i)}
              className="stage-step grid grid-cols-[30px_1fr] items-center gap-3.5 border-b border-dashed border-line py-2.5 last:border-b-0"
            >
              <span className="mark grid h-[30px] w-[30px] place-items-center rounded-full font-mono text-xs">0{i + 1}</span>
              <div className="min-w-0">
                <div className="font-display text-base font-bold leading-tight">{stage.name}</div>
                <div className="mt-0.5 font-mono text-[13px] leading-snug text-muted">{stage.what}</div>
              </div>
            </li>
          ))}
        </ol>
        <p
          className={`mx-[18px] flex items-center gap-2 rounded-[10px] px-3 py-2.5 font-mono text-[12.5px] leading-snug transition-colors ${
            looping ? 'bg-brand-blue/12 text-brand-blue' : 'bg-surface-2 text-muted'
          }`}
        >
          <RepeatIcon className="h-4 w-4 shrink-0" />
          Operate feeds back into the next sprint
        </p>
        <div className="grid grid-cols-3 gap-2.5 px-[18px] pb-[18px] pt-4">
          {CLOUDS.map((cloud, k) => (
            <div
              key={cloud}
              data-lit={k < lit}
              className="lifecycle-target grid justify-items-center gap-2 rounded-xl border border-line px-1.5 py-3 text-center font-mono text-xs text-muted"
            >
              <CloudIcon className="h-[26px] w-[26px]" />
              {cloud}
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}
