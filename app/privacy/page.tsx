import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { COMPANY } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Chellrach Global Limited handles personal data on chellrach.com.',
  alternates: { canonical: '/privacy/' },
}

const email = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="8 October 2026"
      intro={
        <p>
          This policy explains how {COMPANY.name} (&ldquo;Chellrach&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
          personal data when you visit chellrach.com or contact us.
        </p>
      }
      sections={[
        {
          title: 'What we collect',
          body: (
            <ul>
              <li>
                <strong className="text-fg">When you contact us</strong> through the form or by email: your name, email
                address, company (if you give it), the topic you choose and your message.
              </li>
              <li>
                <strong className="text-fg">When you visit the site:</strong> our hosting provider keeps standard server
                logs (such as IP address, browser type and the pages requested) to deliver the site and protect it from
                abuse.
              </li>
              <li>
                <strong className="text-fg">Only if you accept analytics:</strong> anonymous information about your
                visit, such as the pages you view, the buttons you click, your browser and device type and where you came
                from. Your IP address is discarded and not stored.
              </li>
            </ul>
          ),
        },
        {
          title: 'How we use it',
          body: (
            <>
              <p>We use your details to reply to your enquiry, to discuss and deliver any work you ask us about, and to keep the site secure.</p>
              <p>
                If you accept analytics, we use your visit information to understand how the site is used and to improve
                it.
              </p>
              <p>
                Where data-protection laws such as the GDPR apply, we rely on our legitimate interest in answering
                enquiries and running a secure website, on taking steps you have asked for before entering into a
                contract, and, for analytics, on your consent.
              </p>
            </>
          ),
        },
        {
          title: 'Cookies and analytics',
          body: (
            <>
              <p>
                Analytics is off unless you choose to accept it. When you first visit, we ask whether you accept analytics,
                reject it, or want to choose. Until you accept, no analytics script runs and no analytics cookies are set.
              </p>
              <p>
                If you accept, we use <strong className="text-fg">PostHog</strong>, hosted in the European Union. It is
                anonymous: we don&apos;t create a profile of you, don&apos;t record your screen, and never send what you
                type into the contact form. PostHog stores a random identifier in a cookie and in your browser&apos;s
                storage (both starting with <code>ph_</code>) so it can recognise repeat visits.
              </p>
              <p>
                We also store two things in your browser that the site needs: your privacy choice and, if you change it,
                your light or dark theme. These never leave your device.
              </p>
              <p>
                You can change or withdraw your choice at any time from <strong className="text-fg">Privacy
                settings</strong> at the bottom of every page. If you withdraw it, analytics stops, the PostHog
                cookie and identifiers are removed from your browser, and a small marker recording your opt-out is
                kept so analytics stays off.
              </p>
            </>
          ),
        },
        {
          title: 'Who we share it with',
          body: (
            <>
              <p>We don&apos;t sell your personal data. We share it only with service providers who help us run the site and reply to you:</p>
              <ul>
                <li><strong className="text-fg">Netlify</strong>, which hosts the site and receives contact form submissions.</li>
                <li><strong className="text-fg">Our email provider</strong>, which delivers messages to and from us.</li>
                <li><strong className="text-fg">PostHog</strong> (EU hosting), which provides our analytics, only if you accept it.</li>
              </ul>
              <p>We may also disclose data where the law requires it.</p>
            </>
          ),
        },
        {
          title: 'International transfers',
          body: (
            <p>
              Our service providers may process data in countries other than yours. Where that happens, we rely on the
              safeguards they provide, such as standard contractual clauses.
            </p>
          ),
        },
        {
          title: 'How long we keep it',
          body: (
            <p>
              We keep enquiries for as long as we need them to reply and follow up. If an enquiry doesn&apos;t lead to work
              together, we delete it within 12 months. If it does, we keep records for as long as the engagement and
              applicable record-keeping laws require. Analytics data is kept for up to 12 months.
            </p>
          ),
        },
        {
          title: 'Your rights',
          body: (
            <p>
              You can ask us to access, correct or delete your personal data, to restrict or object to how we use it,
              or to give you a copy of it. Email {email} and we&apos;ll respond within one month. You also have the right
              to complain to your local data-protection authority.
            </p>
          ),
        },
        {
          title: 'Changes to this policy',
          body: <p>If we change this policy, we&apos;ll update it on this page and change the date at the top.</p>,
        },
        {
          title: 'Contact',
          body: <p>Questions about this policy or your data: {email}.</p>,
        },
      ]}
    />
  )
}
