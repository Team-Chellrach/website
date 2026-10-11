'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { analyticsConfigured, startAnalytics, stopAnalytics } from '@/lib/analytics'
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from '@/lib/consent'

// GDPR consent. The box offers Accept all and Reject all with equal weight,
// and Preferences opens a side panel with the categories. Analytics stays off
// until accepted; "Privacy settings" in the footer reopens the panel.
export default function ConsentBanner() {
  const [bannerOpen, setBannerOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const bannerTitle = useId()
  const panelTitle = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!analyticsConfigured) return
    const choice = readConsent()
    if (choice) {
      setAnalytics(choice.analytics)
      if (choice.analytics) startAnalytics()
    } else {
      setBannerOpen(true)
    }
    const reopen = () => {
      setAnalytics(readConsent()?.analytics ?? false)
      setPanelOpen(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (!panelOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanelOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [panelOpen])

  function decide(allowAnalytics: boolean) {
    saveConsent(allowAnalytics)
    setAnalytics(allowAnalytics)
    if (allowAnalytics) startAnalytics()
    else stopAnalytics()
    setBannerOpen(false)
    setPanelOpen(false)
  }

  if (!analyticsConfigured) return null

  return (
    <>
      {bannerOpen && !panelOpen && (
        <section
          role="dialog"
          aria-labelledby={bannerTitle}
          className="fixed bottom-3 left-3 right-3 z-[70] grid gap-[18px] border border-fg bg-bg p-[22px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] sm:bottom-6 sm:left-6 sm:right-auto sm:w-[560px] sm:px-8 sm:pb-[30px] sm:pt-7"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <p id={bannerTitle} className="caps text-muted">
            Your privacy
          </p>
          <p className="text-[15px] leading-relaxed">
            We&apos;d like to use analytics to understand how visitors use this site. It&apos;s anonymous and stays off
            unless you accept. See our{' '}
            <Link href="/cookies/" className="underline underline-offset-[3px]">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-3">
            <button type="button" className="btn-outline max-sm:flex-1" onClick={() => decide(true)}>
              Accept all
            </button>
            <button type="button" className="btn-outline max-sm:flex-1" onClick={() => decide(false)}>
              Reject all
            </button>
            <button type="button" className="caps border-b border-current pb-1 text-fg" onClick={() => setPanelOpen(true)}>
              Preferences
            </button>
          </div>
        </section>
      )}

      {panelOpen && (
        <>
          <div className="fixed inset-0 z-[75] bg-[rgba(20,22,21,0.45)]" onClick={() => setPanelOpen(false)} aria-hidden="true" />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={panelTitle}
            className="fixed inset-y-0 right-0 z-[80] grid w-full max-w-[560px] content-start gap-7 overflow-y-auto border-l border-line bg-bg p-[clamp(28px,4vw,56px)]"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 id={panelTitle} className="text-[32px] leading-tight">
                Cookie preferences
              </h2>
              <button ref={closeRef} type="button" className="caps border-b border-current pb-1 text-fg" onClick={() => setPanelOpen(false)}>
                Close
              </button>
            </div>
            <p className="text-muted">
              Choose what you allow. Strictly necessary storage is always on because the site needs it to work.
            </p>

            <div className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-2 border-t border-line pt-[22px]">
              <h3 className="text-[22px]">Strictly necessary</h3>
              <Switch checked disabled label="Strictly necessary, always on" />
              <p className="text-[15px] text-muted">Remembers your privacy choice and, if you change it, your light or dark theme.</p>
              <span className="caps col-start-1 text-[11px] text-muted">Always on</span>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-2 border-t border-line pt-[22px]">
              <h3 className="text-[22px]">Analytics</h3>
              <Switch checked={analytics} onChange={() => setAnalytics(a => !a)} label="Analytics" />
              <p className="text-[15px] text-muted">Anonymous visit statistics, hosted in the EU. Off unless you allow it.</p>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-line pt-7">
              <button type="button" className="btn-outline" onClick={() => decide(analytics)}>
                Save preferences
              </button>
              <button type="button" className="btn-outline" onClick={() => decide(true)}>
                Accept all
              </button>
              <button type="button" className="btn-outline" onClick={() => decide(false)}>
                Reject all
              </button>
            </div>
            <Link href="/cookies/" className="text-link justify-self-start" onClick={() => setPanelOpen(false)}>
              Read the cookie policy
            </Link>
          </aside>
        </>
      )}
    </>
  )
}

function Switch({ checked, disabled, onChange, label }: { checked: boolean; disabled?: boolean; onChange?: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative col-start-2 row-start-1 h-[26px] w-[46px] rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${
        checked ? 'border-brand-green bg-brand-green' : 'border-fg bg-transparent'
      }`}
    >
      <span
        className={`absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full transition-transform ${
          checked ? 'translate-x-5 bg-bg' : 'bg-fg'
        }`}
      />
    </button>
  )
}
