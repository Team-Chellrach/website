'use client'

import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { analyticsConfigured, startAnalytics, stopAnalytics } from '@/lib/analytics'
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from '@/lib/consent'

// GDPR consent: Accept all, Reject all, or Customise then Confirm choices.
// Accept and Reject carry equal weight, analytics is off until accepted, and
// the choice can be changed any time from "Privacy settings" in the footer.
export default function ConsentBanner() {
  const [open, setOpen] = useState(false)
  const [customising, setCustomising] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const titleId = useId()
  const toggleId = useId()

  useEffect(() => {
    if (!analyticsConfigured) return
    const choice = readConsent()
    if (choice) {
      setAnalytics(choice.analytics)
      if (choice.analytics) startAnalytics()
    } else {
      setOpen(true)
    }
    const reopen = () => {
      setAnalytics(readConsent()?.analytics ?? false)
      setCustomising(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  function decide(allowAnalytics: boolean) {
    saveConsent(allowAnalytics)
    setAnalytics(allowAnalytics)
    if (allowAnalytics) startAnalytics()
    else stopAnalytics()
    setOpen(false)
    setCustomising(false)
  }

  if (!open) return null

  const button =
    'rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue'
  const secondary = `${button} border border-line bg-surface text-fg hover:border-brand-blue`
  const primary = `${button} bg-gradient-brand text-white`

  return (
    <section
      role="dialog"
      aria-labelledby={titleId}
      className="fixed inset-x-3 bottom-3 z-[70] rounded-2xl border border-line bg-surface p-5 shadow-[0_20px_60px_-20px_rgba(17,24,32,0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-6"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <h2 id={titleId} className="font-display text-lg font-bold text-fg">
        Your privacy
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        We&apos;d like to use analytics to understand how visitors use this site. It&apos;s anonymous and stays off
        unless you accept. See our{' '}
        <Link href="/privacy/" className="font-medium text-fg underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>

      {customising && (
        <div className="mt-4 grid gap-3 rounded-xl border border-line bg-bg p-4 text-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-fg">Necessary</p>
              <p className="text-muted">Remembers your theme and this choice. Always on.</p>
            </div>
            <span className="shrink-0 font-mono text-xs text-muted">Always on</span>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-line pt-3">
            <label htmlFor={toggleId} className="cursor-pointer">
              <span className="block font-semibold text-fg">Analytics</span>
              <span className="block text-muted">Anonymous visit statistics with PostHog, hosted in the EU.</span>
            </label>
            <button
              id={toggleId}
              type="button"
              role="switch"
              aria-checked={analytics}
              onClick={() => setAnalytics(a => !a)}
              className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                analytics ? 'bg-brand-green' : 'bg-line'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  analytics ? 'translate-x-5' : ''
                }`}
              />
              <span className="sr-only">Allow analytics</span>
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {customising ? (
          <>
            <button type="button" className={primary} onClick={() => decide(analytics)}>
              Confirm choices
            </button>
            <button type="button" className={secondary} onClick={() => decide(false)}>
              Reject all
            </button>
            <button type="button" className={secondary} onClick={() => decide(true)}>
              Accept all
            </button>
          </>
        ) : (
          <>
            <button type="button" className={secondary} onClick={() => decide(true)}>
              Accept all
            </button>
            <button type="button" className={secondary} onClick={() => decide(false)}>
              Reject all
            </button>
            <button
              type="button"
              className={`${button} text-muted underline underline-offset-2 hover:text-fg`}
              onClick={() => setCustomising(true)}
            >
              Customise
            </button>
          </>
        )}
      </div>
    </section>
  )
}
