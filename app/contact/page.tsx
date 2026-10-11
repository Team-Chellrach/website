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
    <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1fr_1.5fr]">
      <div>
        <p className="caps text-muted">Start a project</p>
        <h1 className="mt-6 text-[clamp(38px,5vw,60px)] leading-[1.08] text-fg">
          Tell us what you need
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Tell us what you&apos;re building, improving or running, and we&apos;ll take it from there.
        </p>
        <div className="mt-10 border-t border-line pt-6">
          <p className="caps text-[11px] text-muted">Prefer email?</p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="mt-3 inline-flex items-center gap-2 font-mono text-fg hover:text-brand-blue"
          >
            <MailIcon className="h-5 w-5" /> {COMPANY.email}
          </a>
        </div>
      </div>
      <ContactForm />
    </div>
  )
}
