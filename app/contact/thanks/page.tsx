import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckIcon } from '@/components/icons'

// Where Netlify sends people after a form post without JavaScript.
export const metadata: Metadata = {
  title: 'Message sent',
  robots: { index: false },
}

export default function ThanksPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
        <CheckIcon className="h-6 w-6" />
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold text-fg">Thanks, we&apos;ve got your message</h1>
      <p className="mt-3 text-muted">We&apos;ll reply to the email address you gave us.</p>
      <Link href="/" className="mt-8 inline-block font-semibold text-brand-blue hover:underline">
        Back to the homepage
      </Link>
    </div>
  )
}
