import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="font-display text-6xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-fg">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-muted">It may have moved, or the link may be wrong.</p>
      <Link href="/" className="mt-8 inline-block font-semibold text-brand-blue hover:underline">
        Back to the homepage
      </Link>
    </div>
  )
}
