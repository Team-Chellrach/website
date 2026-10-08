'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { CONTACT_TOPICS, COMPANY } from '@/lib/site'
import { CheckIcon } from './icons'
import { track } from '@/lib/analytics'

// Submissions go to Netlify Forms. Netlify learns the form's fields at deploy
// time from public/__forms.html — keep the two in sync. Without JavaScript the
// browser posts the form normally and Netlify redirects to /contact/thanks.
const FORM_NAME = 'contact'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClass =
  'mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-muted/70 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    const body = new URLSearchParams()
    data.forEach((value, key) => body.append(key, String(value)))
    // Only the chosen topic is tracked, never what the visitor typed.
    const topic = String(data.get('topic') ?? '')
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      setStatus(res.ok ? 'sent' : 'error')
      track(res.ok ? 'contact_form_submitted' : 'contact_form_failed', res.ok ? { topic } : { topic, status: res.status })
    } catch {
      setStatus('error')
      track('contact_form_failed', { topic, status: 0 })
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-line bg-surface p-8 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold text-fg">Thanks, we&apos;ve got your message</h2>
        <p className="mt-2 text-muted">We&apos;ll reply to the email address you gave us.</p>
      </div>
    )
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      action="/contact/thanks/"
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot: hidden from people, filled in by bots, rejected by Netlify. */}
      <p className="hidden">
        <label>
          Leave this empty: <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-fg">
          Name
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-fg">
          Email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-fg">
          Company <span className="font-normal text-muted">(optional)</span>
          <input name="company" autoComplete="organization" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-fg">
          What do you need help with?
          <select name="topic" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose one
            </option>
            {CONTACT_TOPICS.map(topic => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-fg sm:col-span-2">
          Message
          <textarea
            name="message"
            required
            rows={6}
            placeholder="A few lines about what you're building, improving or running, and any timelines."
            className={fieldClass}
          />
        </label>
      </div>

      <p className="mt-5 text-sm text-muted">
        We use your details only to reply to you. See our{' '}
        <Link href="/privacy/" className="font-medium text-fg underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>

      {status === 'error' && (
        <p role="alert" className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          Sorry, your message didn&apos;t send. Please try again, or email us at{' '}
          <a href={`mailto:${COMPANY.email}`} className="font-semibold underline">
            {COMPANY.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
