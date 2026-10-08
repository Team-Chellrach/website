'use client'

import { analyticsConfigured } from '@/lib/analytics'
import { OPEN_CONSENT_EVENT } from '@/lib/consent'

// Reopens the consent choices so a visitor can change or withdraw them.
export default function PrivacySettingsButton({ className = '' }: { className?: string }) {
  if (!analyticsConfigured) return null
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className={className}>
      Privacy settings
    </button>
  )
}
