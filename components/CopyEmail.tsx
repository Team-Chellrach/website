'use client'

import { useState } from 'react'
import { COMPANY } from '@/lib/site'
import { track } from '@/lib/analytics'

// The email as a mailto link, with a button that copies the address for
// people whose device has no mail app set up.
export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMPANY.email)
      setCopied(true)
      track('email_copied')
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard blocked: the address is still on screen to select by hand.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      <a
        href={`mailto:${COMPANY.email}`}
        data-track="email_link_clicked"
        data-track-location="closing_cta"
        className="font-mono text-[15px] text-fg hover:text-brand-blue"
      >
        {COMPANY.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
        className="caps border border-line px-2.5 py-2 text-[11px] text-muted transition-colors hover:border-fg hover:text-fg"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
