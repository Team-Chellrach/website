import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { COMPANY, JOLLOFTV } from '@/lib/site'

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
      updated="6 October 2026"
      intro={
        <p>
          This policy explains how {COMPANY.name} (&ldquo;Chellrach&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
          personal data when you visit chellrach.com or contact us. JollofTV has its own privacy policy at{' '}
          <a href={`${JOLLOFTV.url}/privacy`} className="font-medium text-fg underline underline-offset-2">jolloftv.com/privacy</a>.
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
            </ul>
          ),
        },
        {
          title: 'How we use it',
          body: (
            <>
              <p>We use your details to reply to your enquiry, to discuss and deliver any work you ask us about, and to keep the site secure.</p>
              <p>
                Where data-protection laws such as the GDPR apply, we rely on our legitimate interest in answering
                enquiries and running a secure website, and on taking steps you have asked for before entering into a
                contract.
              </p>
            </>
          ),
        },
        {
          title: 'Cookies and analytics',
          body: (
            <p>
              chellrach.com doesn&apos;t use cookies, analytics, advertising or tracking. If you switch between light and
              dark mode, your choice is saved in your own browser&apos;s storage. It never leaves your device.
            </p>
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
              applicable record-keeping laws require.
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
