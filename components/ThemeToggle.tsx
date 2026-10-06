'use client'

import { MoonIcon, SunIcon } from './icons'
import { THEME_STORAGE_KEY } from '@/lib/theme'

export default function ThemeToggle() {
  function toggle() {
    const dark = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  }

  // Both icons are rendered and CSS picks one, so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Switch between light and dark mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <MoonIcon className="h-5 w-5 dark:hidden" />
      <SunIcon className="hidden h-5 w-5 dark:block" />
    </button>
  )
}
