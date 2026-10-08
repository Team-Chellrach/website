import Link from 'next/link'
import Logo from './Logo'
import PrivacySettingsButton from './PrivacySettingsButton'
import { ArrowUpRightIcon } from './icons'
import { COMPANY, JOLLOFTV } from '@/lib/site'

const linkClass = 'text-muted transition-colors hover:text-fg'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-9" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{COMPANY.tagline}</p>
            <a href={`mailto:${COMPANY.email}`} className="mt-4 inline-block font-mono text-sm text-brand-blue hover:underline">
              {COMPANY.email}
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-fg">Company</p>
            <Link href="/#services" className={`block ${linkClass}`}>Services</Link>
            <Link href="/#work" className={`block ${linkClass}`}>Our work</Link>
            <Link href="/#how" className={`block ${linkClass}`}>How we work</Link>
            <Link href="/contact/" className={`block ${linkClass}`}>Contact</Link>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-fg">Products</p>
            <a href={JOLLOFTV.url} target="_blank" rel="noopener" data-track="jolloftv_link_clicked" data-track-location="footer" className={`inline-flex items-center gap-1 ${linkClass}`}>
              JollofTV <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-fg">Legal</p>
            <Link href="/privacy/" className={`block ${linkClass}`}>Privacy Policy</Link>
            <Link href="/terms/" className={`block ${linkClass}`}>Terms of Use</Link>
            <PrivacySettingsButton className={`block text-left ${linkClass}`} />
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-xs text-muted">
          <p>© {year} {COMPANY.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
