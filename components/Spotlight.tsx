'use client'

import { useEffect } from 'react'

// Feeds the pointer position to `.spotlight` cards as --mx/--my, which the CSS
// uses to place a soft glow under the cursor. One listener for the whole page.
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    function onMove(e: PointerEvent) {
      const card = (e.target as Element | null)?.closest<HTMLElement>('.spotlight')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
  return null
}
