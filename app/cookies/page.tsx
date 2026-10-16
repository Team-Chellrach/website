import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/LegalPage'
import PrivacySettingsButton from '@/components/PrivacySettingsButton'
import { COMPANY } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'The cookies and browser storage chellrach.com uses, and how to control them.',
  alternates: { canonical: '/cookies/' },
}

const row = 'grid gap-1 border-t border-line pt-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6'

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro={
        <p>
          This policy explains the cookies and similar browser storage that chellrach.com uses, run by {COMPANY.name}, and
          how you control them. For everything else about your data, see our{' '}
          <Link href="/privacy/">Privacy Policy</Link>.
        </p>
      }
      sections={[
        {
          title: 'Strictly necessary (always on)',
          body: (
            <>
              <p>These stay in your own browser and are never sent to us. The site needs them to remember your choices.</p>
              <div className="grid gap-3 text-[15px]">
                <div className={row}>
                  <code className="text-fg">chellrach_consent</code>
                  <span>Browser storage. Remembers your privacy choice so we don&apos;t ask on every visit.</span>
                </div>
                <div className={row}>
                  <code className="text-fg">theme</code>
                  <span>Browser storage, only if you switch between light and dark. Remembers your choice.</span>
                </div>
              </div>
            </>
          ),
        },
        {
          title: 'Analytics (only if you accept)',
          body: (
            <>
              <p>
                If you accept analytics, we use PostHog, hosted in the European Union, to understand how visitors use
                the site. PostHog uses a random browser identifier to recognise repeat visits. Until you accept, none
                of the following is set and no analytics script runs.
              </p>
              <div className="grid gap-3 text-[15px]">
                <div className={row}>
                  <code className="text-fg">ph_…_posthog</code>
                  <span>Cookie and browser storage holding a random identifier, so repeat visits can be counted. Kept for up to one year.</span>
                </div>
                <div className={row}>
                  <code className="text-fg">__ph_opt_in_out_…</code>
                  <span>Browser storage set only if you reject analytics after accepting it, so analytics stays off.</span>
                </div>
              </div>
              <p>We don&apos;t use advertising or social media cookies.</p>
            </>
          ),
        },
        {
          title: 'Your choices',
          body: (
            <>
              <p>
                On your first visit you can accept all, reject all, or choose in Preferences. You can change your choice
                at any time from Privacy settings at the bottom of every page. If you withdraw consent, analytics stops
                and its cookie and identifiers are removed from your browser.
              </p>
              <p>
                <PrivacySettingsButton className="font-medium text-fg underline underline-offset-2" />
              </p>
              <p>You can also block or delete cookies in your browser settings. The site works without them.</p>
            </>
          ),
        },
        {
          title: 'Changes to this policy',
          body: <p>If we change how we use cookies, we&apos;ll update this page and the date at the top, and ask for your choice again.</p>,
        },
        {
          title: 'Contact',
          body: (
            <p>
              Questions about cookies: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          ),
        },
      ]}
    />
  )
}
