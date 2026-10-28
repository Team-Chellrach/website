import ArchFlow from './ArchFlow'
import CountUp from './CountUp'
import PlatformIcon from './PlatformIcon'
import { GOOGLE_PLAY_URL, JOLLOFTV, type PlatformStatus } from '@/lib/site'

const DOT: Record<PlatformStatus, string> = {
  live: 'bg-[#3fd0a8]',
  review: 'bg-[#e3b341]',
  development: 'bg-[#5d6875]',
}

// JollofTV: our own product, and the proof of our work. Always dark, like the product.
export default function JollofShowcase() {
  return (
    <section id="work" aria-labelledby="work-title" className="overflow-hidden bg-stage py-[clamp(72px,10vw,128px)] text-stage-fg">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal grid min-w-0 gap-[26px]">
            <p className="caps text-jollof">Our work · Our product</p>
            <img src="/brand/jolloftv-wordmark-dark.svg" alt="JollofTV" className="mark-in h-11 w-auto justify-self-start" />
            <h2 id="work-title" className="text-[clamp(30px,3.4vw,44px)] leading-[1.15]">
              Free live TV and radio for Africans, wherever you are.
            </h2>
            <p className="max-w-[54ch] text-stage-muted">
              JollofTV is our own streaming product, and the clearest example of what we do: the apps, the streaming
              infrastructure, the pipelines and the monitoring, all designed, built and run by Chellrach.
            </p>
            <ul className="grid grid-cols-2 gap-x-5 border-y border-stage-line sm:grid-cols-4">
              {[
                [JOLLOFTV.channels, 'Live TV channels'],
                [JOLLOFTV.stations, 'Radio stations'],
                [String(JOLLOFTV.platforms.length), 'Platforms built for'],
                [String(JOLLOFTV.languages), 'Languages'],
              ].map(([value, label]) => (
                <li key={label} className="py-5">
                  <span className="block font-display text-[40px] leading-none tabular-nums"><CountUp value={value} /></span>
                  <span className="caps mt-2 block text-[11px] leading-snug text-stage-muted">{label}</span>
                </li>
              ))}
            </ul>
            <ul aria-label="Where JollofTV is available" className="caps flex flex-wrap gap-x-[22px] gap-y-2 text-stage-muted">
              {JOLLOFTV.platforms.map(p => {
                const url = 'url' in p ? p.url : undefined
                const linkLabel = 'label' in p ? p.label : undefined
                return (
                  <li key={p.name} className={`inline-flex items-center gap-2 ${p.status === 'live' ? 'text-stage-fg' : ''}`}>
                    <span className={`h-[7px] w-[7px] rounded-full ${DOT[p.status]}`} />
                    <PlatformIcon name={p.name} />
                    {url ? (
                      <a href={url} target="_blank" rel="noopener" className="underline-offset-4 hover:underline" aria-label={linkLabel}>
                        {p.name} ↗
                      </a>
                    ) : (
                      p.name
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="font-mono text-[12px] text-stage-muted">Green: live now · Amber: in app store review · Grey: in development</p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <a
                href={JOLLOFTV.url}
                target="_blank"
                rel="noopener"
                data-track="jolloftv_link_clicked"
                data-track-location="showcase"
                className="text-link text-stage-fg"
              >
                Visit jolloftv.com <span aria-hidden="true">↗</span>
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener"
                data-track="google_play_clicked"
                data-track-location="showcase"
                className="text-link text-stage-fg"
              >
                Get it on Google Play <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="reveal relative mr-2 min-w-0 pb-24" aria-label="JollofTV on a smart TV and a phone">
            <div className="tv-in">
              <div className="aspect-video overflow-hidden border-[10px] border-b-[14px] border-[#232624] bg-black">
                <img src="/showcase/jolloftv-tv-home-oct12.webp" alt="JollofTV home screen on TV featuring Africanews English with a live video preview" width={1600} height={900} loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </div>
              <div className="mx-auto h-3 w-[24%] bg-[#232624]" />
            </div>
            <div className="phone-in absolute -right-2 bottom-0 w-[24%]">
              <div className="aspect-[1179/2556] overflow-hidden rounded-[30px] border-[6px] border-[#1c1e1d] bg-[#0a0a0a] shadow-[-18px_24px_48px_-18px_rgba(0,0,0,0.9)]">
                <img src="/showcase/jolloftv-phone.webp" alt="JollofTV live TV screen on iPhone" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-[clamp(64px,8vw,104px)] grid gap-7 border-t border-stage-line pt-10">
          <h3 className="text-[28px]">How it&apos;s built</h3>
          <ArchFlow />
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-stage-muted">
            {[
              'CI/CD with vulnerability scanning and secret detection',
              'Error tracking and product analytics',
              'Accounts with up to five family profiles, including a Kids profile, and My List synced across devices',
            ].map(item => (
              <li key={item}>
                <span className="text-[#3fd0a8]">— </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
