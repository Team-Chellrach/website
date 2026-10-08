// The visitor's privacy choice, kept in their own browser. Analytics stays off
// until they opt in; "necessary" storage (theme and this choice) is always on.

export const CONSENT_STORAGE_KEY = 'chellrach_consent'
// Bump when the categories change, so everyone is asked again.
const CONSENT_VERSION = 1

export interface ConsentChoice {
  version: number
  analytics: boolean
  decidedAt: string
}

/** Fired to reopen the privacy choices (e.g. from the footer). */
export const OPEN_CONSENT_EVENT = 'chellrach:open-consent'

export function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentChoice
    return parsed.version === CONSENT_VERSION ? parsed : null
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean): ConsentChoice {
  const choice: ConsentChoice = { version: CONSENT_VERSION, analytics, decidedAt: new Date().toISOString() }
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice))
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  return choice
}
