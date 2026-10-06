import type { ReactNode } from 'react'

export interface LegalSection {
  title: string
  body: ReactNode
}

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-fg">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
      <div className="mt-8 text-lg leading-relaxed text-muted">{intro}</div>
      <div className="mt-12 space-y-10">
        {sections.map((s, i) => (
          <section key={s.title}>
            <h2 className="font-display text-xl font-bold text-fg">
              {i + 1}. {s.title}
            </h2>
            <div className="mt-3 space-y-3 leading-relaxed text-muted [&_a]:font-medium [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
