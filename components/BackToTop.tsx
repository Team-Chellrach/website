'use client'

import { useEffect, useState } from 'react'

// "Top" button that appears once the footer comes into view, bottom-right so
// it never overlaps the privacy box (bottom-left).
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  function toTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // Continue from the top for keyboard and screen-reader users.
    document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`caps fixed bottom-3 right-3 z-[65] flex items-center gap-2 border border-fg bg-bg px-4 py-3.5 text-[11px] text-fg shadow-[0_20px_40px_-24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-fg hover:text-bg sm:bottom-6 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <span aria-hidden="true">↑</span> Top
    </button>
  )
}
