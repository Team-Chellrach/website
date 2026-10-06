'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Fades `.reveal` elements in as they scroll into view. Everything is visible
// until this runs, and nothing animates for visitors who prefer reduced motion.
export default function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const root = document.documentElement
    root.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 80}ms`
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in')
      else observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  return null
}
