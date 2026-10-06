import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { COMPANY, JOLLOFTV } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply to using chellrach.com.',
  alternates: { canonical: '/terms/' },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="6 October 2026"
      intro={
        <p>
          These terms apply to your use of chellrach.com, which is run by {COMPANY.name} (&ldquo;Chellrach&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site, you agree to them.
        </p>
      }
      sections={[
        {
          title: 'Information only',
          body: (
            <p>
              The content on this site is general information about Chellrach, our products and our services. It
              isn&apos;t professional advice. Any work we do for you is governed by a separate written agreement between
              us, not by these terms.
            </p>
          ),
        },
        {
          title: 'Our products',
          body: (
            <p>
              Our products have their own terms. For example, JollofTV is governed by the terms at{' '}
              <a href={`${JOLLOFTV.url}/terms`}>jolloftv.com/terms</a>.
            </p>
          ),
        },
        {
          title: 'Intellectual property',
          body: (
            <p>
              The Chellrach and JollofTV names and logos, and the content of this site, belong to {COMPANY.name}. You
              may not copy or use them without our written permission, except to share or link to pages on this site.
            </p>
          ),
        },
        {
          title: 'Acceptable use',
          body: (
            <p>
              Don&apos;t misuse the site. That includes trying to disrupt or gain unauthorised access to it, or sending
              unlawful, abusive or spam content through the contact form.
            </p>
          ),
        },
        {
          title: 'Links to other sites',
          body: <p>We link to other websites for convenience. We aren&apos;t responsible for their content or practices.</p>,
        },
        {
          title: 'No warranty and limitation of liability',
          body: (
            <p>
              We work to keep the site accurate and available, but provide it &ldquo;as is&rdquo;, without warranties of
              any kind. To the fullest extent the law allows, we aren&apos;t liable for any loss arising from your use of
              the site.
            </p>
          ),
        },
        {
          title: 'Changes to these terms',
          body: <p>We may update these terms. The date at the top shows when they last changed.</p>,
        },
        {
          title: 'Contact',
          body: (
            <p>
              Questions about these terms: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          ),
        },
      ]}
    />
  )
}
