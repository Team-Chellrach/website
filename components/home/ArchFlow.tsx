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
    detail: 'A TypeScript monorepo with shared packages for data, accounts and playback serves web, iOS, Android, Android TV, Samsung Tizen and LG webOS.',
  },
]

// "How it's built": four numbered steps in order; select one to read what it does.
export default function ArchFlow() {
  const [selected, setSelected] = useState(0)
  const node = NODES[selected]

  return (
    <div className="grid gap-7">
      <div role="tablist" aria-label="How JollofTV is built" className="grid grid-cols-2 border-t border-stage-line md:grid-cols-4">
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
            className={`step-bar group relative grid gap-2 border-stage-line px-5 pb-[22px] pt-5 text-left focus-visible:outline-[#ff8a6b] ${
              i % 2 === 0 ? 'max-md:border-r' : ''
            } ${i < NODES.length - 1 ? 'md:border-r' : ''} ${i < 2 ? 'max-md:border-b' : ''}`}
          >
            <span className="font-mono text-[12px] text-stage-muted">
              0{i + 1} · {n.key}
            </span>
            <span className="font-display text-[20px] leading-snug transition-colors group-hover:text-[#ff8a6b]">{n.title}</span>
          </button>
        ))}
      </div>
      <p id="arch-detail" role="tabpanel" aria-labelledby={`arch-tab-${selected}`} className="min-h-14 max-w-[80ch] text-stage-muted">
        <strong className="font-medium text-stage-fg">{node.title}.</strong> {node.detail}
      </p>
    </div>
  )
}
