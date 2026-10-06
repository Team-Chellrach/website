'use client'

import { useState } from 'react'
import { CopyIcon } from './icons'
import { COMPANY } from '@/lib/site'

// The email as a mailto link, with a button that copies the address for
// people whose device has no mail app set up.
export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMPANY.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard blocked: the address is still on screen to select by hand.
    }
  }

  return (
    <span className="inline-flex items-center overflow-hidden rounded-full border border-white/45">
      <a href={`mailto:${COMPANY.email}`} className="px-4 py-3 font-mono text-[15px] leading-none text-white hover:bg-white/10">
        {COMPANY.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
        title="Copy email address"
        className="border-l border-white/45 px-3 py-3 text-white hover:bg-white/10"
      >
        {copied ? <span className="font-mono text-xs">Copied</span> : <CopyIcon className="h-[15px] w-[15px]" />}
      </button>
    </span>
  )
}
