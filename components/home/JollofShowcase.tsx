import ArchFlow from './ArchFlow'
import CountUp from './CountUp'
import { ArrowUpRightIcon } from '../icons'
import { JOLLOFTV, type PlatformStatus } from '@/lib/site'

const DOT: Record<PlatformStatus, string> = {
  live: 'bg-[#1cc79c] shadow-[0_0_0_3px_rgba(28,199,156,0.2)]',
  review: 'bg-[#e7b008]',
  development: 'bg-[#5d6875]',
}

// JollofTV: our own product, and the proof of our work. Always dark, like the product.
export default function JollofShowcase() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-hidden bg-stage py-20 text-stage-fg sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 -top-64 h-[720px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(240,60,30,0.22),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal grid min-w-0 gap-5">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff7a5c]">Our work · Our product</p>
            <img src="/brand/jolloftv-wordmark-dark.svg" alt="JollofTV" className="h-[46px] w-auto justify-self-start" />
            <h2 id="work-title" className="font-display text-[clamp(26px,3.4vw,36px)] font-bold leading-[1.15] tracking-tight">
              Free live African TV and radio, for Africans everywhere.
            </h2>
            <p className="max-w-[60ch] text-lg text-stage-muted">
              JollofTV is our own streaming product, and the clearest example of what we do: the apps, the streaming
              infrastructure, the pipelines and the monitoring, all designed, built and run by Chellrach.
            </p>
            <ul className="grid grid-cols-2 gap-4 border-y border-stage-line py-5 sm:grid-cols-4">
              {[
                [JOLLOFTV.channels, 'live TV channels'],
                [JOLLOFTV.stations, 'radio stations'],
                [String(JOLLOFTV.platforms.length), 'platforms built for'],
                [String(JOLLOFTV.languages), 'languages'],
              ].map(([value, label]) => (
                <li key={label}>
                  <span className="block font-display text-3xl font-extrabold tabular-nums tracking-tight"><CountUp value={value} /></span>
                  <span className="mt-1.5 block text-[13px] text-stage-muted">{label}</span>
                </li>
              ))}
            </ul>
            <ul aria-label="Where JollofTV is available" className="flex flex-wrap gap-2">
              {JOLLOFTV.platforms.map(p => (
                <li
                  key={p.name}
                  className={`inline-flex items-center gap-[7px] rounded-full border px-[11px] py-2 font-mono text-xs ${
                    p.status === 'live' ? 'border-[#1cc79c]/50 text-stage-fg' : 'border-stage-line text-stage-muted'
                  }`}
                >
                  <span className={`h-[7px] w-[7px] rounded-full ${DOT[p.status]}`} />
                  {p.name}
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs text-stage-muted">Green: live now · Amber: in app store review · Grey: in development</p>
            <a
              href={JOLLOFTV.url}
              target="_blank"
              rel="noopener"
              data-track="jolloftv_link_clicked"
              data-track-location="showcase"
              className="inline-flex items-center gap-2 justify-self-start rounded-full bg-jollof px-[22px] py-[13px] text-[15px] font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Visit jolloftv.com <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="reveal relative mr-1.5 min-w-0 pb-10 lg:mr-0" aria-label="JollofTV on a smart TV and a phone">
            <div className="aspect-video overflow-hidden rounded-xl border-[10px] border-b-[14px] border-[#1f242b] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <img src="/showcase/jolloftv-tv.webp" alt="JollofTV home screen on Android TV" className="h-full w-full object-cover" />
            </div>
            <div className="mx-auto h-3.5 w-[26%] rounded-b-[10px] bg-gradient-to-b from-[#1f242b] to-[#12161b]" />
            <div className="absolute -right-1.5 bottom-0 aspect-[754/1470] w-[27%] overflow-hidden rounded-[28px] bg-[#0a0a0a] shadow-[-20px_30px_60px_-20px_rgba(0,0,0,0.85)]">
              <img src="/showcase/jolloftv-phone.webp" alt="JollofTV live TV screen on an Android phone" className="h-full w-full object-contain" />
            </div>
          </div>
        </div>

        <div className="reveal mt-16 grid gap-[22px] border-t border-stage-line pt-10">
          <h3 className="font-display text-xl font-bold">How it&apos;s built</h3>
          <ArchFlow />
          <ul className="flex flex-wrap gap-x-7 gap-y-2.5 text-sm text-stage-muted">
            {[
              'CI/CD with vulnerability scanning and secret detection',
              'Error tracking and product analytics',
              'Accounts, family profiles and Stripe billing on Postgres',
            ].map(item => (
              <li key={item}>
                <span className="text-[#1cc79c]">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-7 text-sm text-stage-muted">More Chellrach products are in development.</p>
      </div>
    </section>
  )
}
