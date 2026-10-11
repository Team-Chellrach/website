import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="font-display text-[88px] leading-none text-brand-blue">404</p>
      <h1 className="mt-6 text-[32px] leading-tight text-fg">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-muted">It may have moved, or the link may be wrong.</p>
      <Link href="/" className="text-link mt-8">
        Back to the homepage
      </Link>
    </div>
  )
}
