import Link from 'next/link'
import Logo from './Logo'
import PrivacySettingsButton from './PrivacySettingsButton'
import { COMPANY, JOLLOFTV } from '@/lib/site'

const linkClass = 'block py-[5px] text-[14px] leading-snug text-fg transition-colors hover:text-brand-blue'
const headingClass = 'caps mb-4 text-[11px] text-muted'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line pb-7 pt-16">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-[34px]" />
            <p className="mt-[18px] max-w-[34ch] text-[14px] text-muted">{COMPANY.tagline}</p>
            <a href={`mailto:${COMPANY.email}`} className="mt-4 inline-block font-mono text-[14px] text-fg hover:text-brand-blue">
              {COMPANY.email}
            </a>
          </div>

          <div>
            <p className={headingClass}>Company</p>
            <Link href="/#services" className={linkClass}>Services</Link>
            <Link href="/#work" className={linkClass}>Our work</Link>
            <Link href="/#how" className={linkClass}>How we work</Link>
            <Link href="/contact/" className={linkClass}>Contact</Link>
          </div>

          <div>
            <p className={headingClass}>Products</p>
            <a
              href={JOLLOFTV.url}
              target="_blank"
              rel="noopener"
              data-track="jolloftv_link_clicked"
              data-track-location="footer"
              className={linkClass}
            >
              JollofTV ↗
            </a>
          </div>

          <div>
            <p className={headingClass}>Legal</p>
            <Link href="/privacy/" className={linkClass}>Privacy Policy</Link>
            <Link href="/cookies/" className={linkClass}>Cookie Policy</Link>
            <Link href="/terms/" className={linkClass}>Terms of Use</Link>
            <PrivacySettingsButton className={`${linkClass} text-left`} />
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-5 text-[12px] text-muted">
          © {year} {COMPANY.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
