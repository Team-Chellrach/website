'use client'

import { useEffect } from 'react'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import { track } from '@/lib/analytics'

const systemQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

function savedTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

// The site follows the visitor's system setting. The toggle overrides it, and
// toggling back to match the system clears the override so the site follows
// the system again.
export default function ThemeToggle() {
  // Follow live system changes (e.g. an evening dark-mode schedule) unless
  // the visitor has picked a theme.
  useEffect(() => {
    const query = systemQuery()
    const onChange = () => {
      if (!savedTheme()) document.documentElement.classList.toggle('dark', query.matches)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  function toggle() {
    const dark = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', dark)
    track('theme_changed', { theme: dark ? 'dark' : 'light' })
    try {
      if (dark === systemQuery().matches) localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  }

  // Both labels are rendered and CSS picks one, so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Switch between light and dark mode"
      className="caps text-muted transition-colors hover:text-fg"
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </button>
  )
}
