'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { CloseIcon, MenuIcon } from './icons'
import { NAV_LINKS } from '@/lib/site'

export default function Header() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo className="h-8 sm:h-9" />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/contact/"
            className="hidden rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px md:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg hover:bg-surface-2 md:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-bg px-4 pb-6 pt-2 md:hidden">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-fg hover:bg-surface-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-gradient-brand px-5 py-3 text-center font-semibold text-white"
          >
            Start a project
          </Link>
        </nav>
      )}
    </header>
  )
}
