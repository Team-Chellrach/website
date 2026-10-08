'use client'

import { useState } from 'react'
import { JOLLOFTV } from '@/lib/site'
import { track } from '@/lib/analytics'

const NODES = [
  {
    key: 'Catalogue',
    title: '300+ channels and stations',
    detail: 'Live TV and radio feeds from broadcasters across Africa and the diaspora, each with its own format, quirks and uptime.',
  },
  {
    key: 'Edge',
    title: 'Stream proxy',
    detail: 'Fetches and rewrites HLS playlists server-side, adds the headers some broadcasters require, and blocks unsafe redirects.',
  },
  {
    key: 'Player',
    title: 'Playback recovery',
    detail: "The player detects stalled or failing streams and tries to recover automatically, so a brief hiccup at the source needn't end the viewer's session.",
  },
  {
    key: 'Apps',
    title: `${JOLLOFTV.platforms.length} platforms`,
    detail: 'A TypeScript monorepo with shared packages for data, accounts and playback serves web, iOS, Android, Android TV, Samsung and LG.',
  },
]

// "How it's built": click a stage to read what it does.
export default function ArchFlow() {
  const [selected, setSelected] = useState(0)
  const node = NODES[selected]

  return (
    <div className="grid gap-5">
      <div role="tablist" aria-label="How JollofTV is built" className="grid gap-[26px] md:grid-cols-4 md:gap-7">
        {NODES.map((n, i) => (
          <button
            key={n.key}
            type="button"
            role="tab"
            id={`arch-tab-${i}`}
            aria-selected={i === selected}
            aria-controls="arch-detail"
            onClick={() => {
              setSelected(i)
              track('architecture_step_viewed', { step: n.key })
            }}
            className={`relative grid gap-1.5 rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7a5c] ${
              i === selected ? 'border-[#ff7a5c] bg-[#1c1512]' : 'border-stage-line bg-stage-2 hover:border-[#5a6470]'
            }`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stage-muted">{n.key}</span>
            <span className="font-display font-bold leading-snug">{n.title}</span>
            {i < NODES.length - 1 && (
              <span
                aria-hidden="true"
                className="flow-link absolute -bottom-[27px] left-6 h-[26px] w-0.5 md:-right-[29px] md:bottom-auto md:left-auto md:top-1/2 md:h-0.5 md:w-7"
              />
            )}
          </button>
        ))}
      </div>
      <p
        id="arch-detail"
        role="tabpanel"
        aria-labelledby={`arch-tab-${selected}`}
        className="min-h-[76px] rounded-xl border border-stage-line bg-stage-2 px-5 py-4 text-stage-muted"
      >
        <strong className="text-stage-fg">{node.title}.</strong> {node.detail}
      </p>
    </div>
  )
}
