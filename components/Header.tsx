'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { NAV_LINKS } from '@/lib/site'

export default function Header() {
  const [open, setOpen] = useState(false)

  // Full-screen menu on phones: close with Escape, and stop the page behind scrolling.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // The menu renders beside the header, not inside it: the header's
  // backdrop blur would otherwise trap the fixed overlay within its height.
  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-6 px-6">
        <Logo className="h-8 sm:h-[34px]" />

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="caps text-fg transition-colors hover:text-brand-blue">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-7">
          <ThemeToggle />
          <Link
            href="/contact/"
            data-track="start_project_clicked"
            data-track-location="header"
            className="text-link hidden sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="caps text-fg lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden">
          <div className="flex h-[76px] items-center justify-between border-b border-line px-6">
            <Logo className="h-8" />
            <button type="button" onClick={() => setOpen(false)} className="caps text-fg" autoFocus>
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col px-6 pt-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 font-display text-[32px] leading-tight text-fg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              data-track="start_project_clicked"
              data-track-location="mobile_menu"
              className="text-link mt-10 self-start"
            >
              Start a project <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
