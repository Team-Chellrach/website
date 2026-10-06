import Link from 'next/link'

// Both colourways from the designer's kit are rendered; CSS shows the one that
// matches the theme, so there is no flash of the wrong logo on load.
export default function Logo({ className = 'h-9' }: { className?: string }) {
  return (
    <Link href="/" aria-label="Chellrach Global Limited, home" className="inline-flex shrink-0 items-center">
      <img src="/brand/chellrach-logo-light.svg" alt="Chellrach Global Limited" className={`${className} w-auto dark:hidden`} />
      <img src="/brand/chellrach-logo-dark.svg" alt="Chellrach Global Limited" className={`${className} hidden w-auto dark:block`} />
    </Link>
  )
}
