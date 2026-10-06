import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { MailIcon } from '@/components/icons'
import { COMPANY } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Chellrach: software, cloud, platform, DevOps, SRE, security, networking or AI work.',
  alternates: { canonical: '/contact/' },
}

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_1.5fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-brand-blue">Start a project</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          Tell us what you need
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Tell us what you&apos;re building, improving or running, and we&apos;ll take it from there.
        </p>
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm text-muted">Prefer email?</p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="mt-2 inline-flex items-center gap-2 font-semibold text-fg hover:text-brand-blue"
          >
            <MailIcon className="h-5 w-5" /> {COMPANY.email}
          </a>
        </div>
      </div>
      <ContactForm />
    </div>
  )
}
