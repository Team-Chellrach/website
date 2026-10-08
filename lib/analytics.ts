import type { PostHog } from 'posthog-js'

// PostHog analytics, loaded only after the visitor accepts analytics in the
// consent banner. Before that, no script, cookie or request reaches PostHog.
//
// Anonymous by design: no person profiles, no session recordings, and nothing
// typed into the contact form is sent.

const TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'

/** With no project token there is nothing to consent to, so no banner either. */
export const analyticsConfigured = Boolean(TOKEN)

let client: PostHog | null = null
let warned = false

function warnMissingToken() {
  if (warned || process.env.NODE_ENV === 'production') return
  warned = true
  console.error(
    'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured',
  )
}

export async function startAnalytics() {
  if (!TOKEN) return warnMissingToken()
  if (client) {
    client.set_config({ persistence: 'localStorage+cookie' })
    client.opt_in_capturing()
    document.addEventListener('click', trackMarkedClicks)
    return
  }
  const { default: posthog } = await import('posthog-js')
  posthog.init(TOKEN, {
    api_host: HOST,
    defaults: '2026-08-30',
    person_profiles: 'never',
    disable_session_recording: true,
    capture_exceptions: true,
  })
  client = posthog
  document.addEventListener('click', trackMarkedClicks)
}

/** Stops analytics and removes what PostHog stored in this browser. */
export function stopAnalytics() {
  if (client) {
    // Switch to memory first: otherwise PostHog writes a fresh ID straight back.
    client.set_config({ persistence: 'memory' })
    client.opt_out_capturing()
    document.removeEventListener('click', trackMarkedClicks)
  }
  clearPostHogStorage()
  // And once more after any write PostHog had already queued.
  window.setTimeout(clearPostHogStorage, 0)
}

function clearPostHogStorage() {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith('ph_'))
      .forEach(key => localStorage.removeItem(key))
  } catch {
    // Storage blocked: nothing was stored.
  }
  document.cookie
    .split(';')
    .map(c => c.split('=')[0].trim())
    .filter(name => name.startsWith('ph_'))
    .forEach(name => {
      document.cookie = `${name}=; Max-Age=0; path=/`
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, '')}`
    })
}

export function track(event: string, properties?: Record<string, string | number | boolean>) {
  client?.capture(event, properties)
}

// Links in server-rendered markup are tracked with data attributes, e.g.
// <a data-track="start_project_clicked" data-track-location="hero">.
function trackMarkedClicks(e: MouseEvent) {
  const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]')
  if (!el?.dataset.track) return
  track(el.dataset.track, el.dataset.trackLocation ? { location: el.dataset.trackLocation } : undefined)
}
