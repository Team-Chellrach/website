import Link from 'next/link'
import CopyEmail from '@/components/CopyEmail'
import Lifecycle from '@/components/home/Lifecycle'
import Terminal from '@/components/home/Terminal'
import JollofShowcase from '@/components/home/JollofShowcase'
import { Fragment } from 'react'

const SERVICES: { title: string; body: string; tags: string[]; highlight?: string }[] = [
  {
    title: 'Cloud architecture and migration',
    body: 'Design new cloud foundations or move existing workloads, right-sized from the start, with clear cost visibility.',
    tags: ['AWS', 'Azure', 'Google Cloud', 'Landing zones', 'AWS & Azure Well-Architected', 'Cost optimisation'],
    highlight: 'AWS & Azure Well-Architected',
  },
  {
    title: 'Platform engineering',
    body: 'Internal platforms on Kubernetes that let your developers ship safely, with more autonomy.',
    tags: ['Kubernetes', 'OpenShift', 'Helm', 'Self-service'],
  },
  {
    title: 'DevOps and CI/CD',
    body: 'Automated, repeatable delivery, with every environment defined in code and every change reviewed.',
    tags: ['Terraform', 'ArgoCD', 'GitHub Actions', 'Azure DevOps'],
  },
  {
    title: 'Site reliability and scalability',
    body: 'Telemetry from metrics, logs and traces, SLOs and incident response, plus the architecture to handle growth and traffic spikes.',
    tags: ['OpenTelemetry', 'SLOs', 'Autoscaling', 'Incident response'],
  },
  {
    title: 'Security and DevSecOps',
    body: 'Security built into code, pipelines and infrastructure, with compliance checks automated.',
    tags: ['Vulnerability scanning', 'Secrets', 'Policy-as-code', 'IAM'],
  },
  {
    title: 'Networking and connectivity',
    body: 'Secure, reliable connectivity between clouds, on-premises systems, services and users.',
    tags: ['VPC / VNet design', 'Hybrid & multi-cloud', 'Private endpoints', 'CDN & edge'],
  },
  {
    title: 'Software development',
    body: 'Web, mobile and smart-TV apps, and the backends and APIs behind them.',
    tags: ['Web', 'iOS & Android', 'Smart TV', 'APIs'],
  },
  {
    title: 'AI and LLM integration',
    body: 'LLM-powered features in your products, retrieval over your own data, and MCP servers that connect AI assistants to your tools.',
    tags: ['LLMs', 'RAG', 'AI agents', 'MCP'],
  },
]

const PRINCIPLES = [
  ['Secure by default', 'Least-privilege access, encrypted data and scanned dependencies from the start.'],
  ['Everything as code', 'Infrastructure, pipelines and policies in version control: reviewed, repeatable and easy to roll back.'],
  ['Observable', 'Metrics, logs and alerts built into what we ship, so problems are spotted early, often before users notice.'],
  ['Portable by design', 'Open tooling and standard patterns that are easy to maintain, extend or move. Your code and infrastructure stay yours.'],
]

const ENGAGEMENTS = [
  ['Fixed-scope projects', 'A clear outcome, timeline and price. New products, migrations, platform builds.'],
  ['Advisory and architecture reviews', 'An expert second opinion on your setup, costs, security or reliability, with a written plan.'],
  ['Monthly support retainers', 'Ongoing hands-on help to run, maintain and improve your platform.'],
]

const TECHNOLOGIES = [
  'AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'OpenShift', 'Terraform', 'Helm', 'ArgoCD',
  'GitHub Actions', 'Azure DevOps', 'GitLab CI', 'Docker', 'Prometheus', 'Grafana', 'OpenTelemetry',
  'Next.js', 'React', 'React Native', 'TypeScript', 'PostgreSQL', 'Supabase', 'Stripe', 'Sentry', 'MCP',
]

const wrap = 'mx-auto max-w-[1240px] px-6'
const section = 'py-[clamp(56px,8vw,104px)]'
const h2 = 'text-[clamp(30px,3.4vw,44px)] leading-[1.15]'
const label = 'caps text-muted'

// Splits a headline into words that rise in one after another when revealed.
function Words({ text, start = 0, step = 0.07 }: Readonly<{ text: string; start?: number; step?: number }>) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="rise inline-block" style={{ animationDelay: `${start + i * step}s` }}>
        {word}
      </span>
    </Fragment>
  ))
}

const PACKETS = [
  { path: 'M0,-260 L225,-130 L225,130 L0,260 L-225,130 L-225,-130 Z', dur: '10s', begin: '0s', r: 7, tone: 'fill-brand-blue' },
  { path: 'M0,-180 L-156,-90 L-156,90 L0,180 L156,90 L156,-90 Z', dur: '8s', begin: '0s', r: 6, tone: 'fill-brand-green' },
  { path: 'M0,-260 L0,-100', dur: '2.6s', begin: '0s', r: 5, tone: 'fill-brand-blue' },
  { path: 'M225,130 L87,50', dur: '2.6s', begin: '0.9s', r: 5, tone: 'fill-brand-green' },
  { path: 'M-225,130 L-87,50', dur: '2.6s', begin: '1.7s', r: 5, tone: 'fill-brand-blue' },
]

// The logo's hexagon as a line drawing behind the hero: it sketches itself in,
// then packets of "traffic" travel its lines.
function HexDrawing({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="-300 -300 600 600" fill="none" stroke="currentColor" aria-hidden="true" className={`hex-sketch ${className}`}>
      <polygon points="0,-260 225,-130 225,130 0,260 -225,130 -225,-130" strokeWidth="1.5" pathLength={1} />
      <polygon points="0,-180 156,-90 156,90 0,180 -156,90 -156,-90" strokeWidth="1.5" pathLength={1} />
      <polygon points="0,-100 87,-50 87,50 0,100 -87,50 -87,-50" strokeWidth="24" pathLength={1} />
      <line x1="0" y1="-260" x2="0" y2="-100" strokeWidth="1.5" pathLength={1} />
      <line x1="225" y1="130" x2="87" y2="50" strokeWidth="1.5" pathLength={1} />
      <line x1="-225" y1="130" x2="-87" y2="50" strokeWidth="1.5" pathLength={1} />
      <circle cx="0" cy="-260" r="9" fill="currentColor" stroke="none" />
      <circle cx="225" cy="130" r="9" fill="currentColor" stroke="none" />
      <circle cx="-225" cy="130" r="9" fill="currentColor" stroke="none" />
      {PACKETS.map(p => (
        <circle key={p.path + p.begin} className={`packet ${p.tone}`} r={p.r} stroke="none">
          <animateMotion path={p.path} dur={p.dur} begin={p.begin} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-[clamp(56px,7vw,96px)] pt-[clamp(64px,9vw,120px)]">
        <div className="reveal pointer-events-none absolute -right-[120px] -top-[80px] h-[680px] w-[680px] text-line max-lg:-right-[200px] max-lg:-top-[40px] max-lg:h-[440px] max-lg:w-[440px]">
          {/* Fade lives on the drawing, not the wrapper, so the reveal animation can't override it. */}
          <HexDrawing className="h-full w-full max-lg:opacity-45" />
        </div>
        <div className={`${wrap} relative grid items-end gap-12 lg:grid-cols-[1.25fr_1fr]`}>
          <div className="reveal">
            <p className={`${label} flex items-center gap-6 text-fg after:h-px after:max-w-[300px] after:flex-1 after:bg-line max-sm:after:hidden`}>
              Software · Cloud · Platforms
            </p>
            <h1 className="mt-9 text-[clamp(44px,6.4vw,84px)] leading-[1.04]">
              <Words text="We design, build and run software and cloud" />{' '}
              <em className="rise inline-block text-brand-blue" style={{ animationDelay: '0.65s' }}>
                platforms.
              </em>
            </h1>
            <p className="mt-7 max-w-[52ch] text-[18px] leading-relaxed text-muted">
              Web, mobile and TV apps, and the cloud, DevOps, SRE, security and networking that keep them running.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href="/contact/" data-track="start_project_clicked" data-track-location="hero" className="btn-solid">
                Start a project <span aria-hidden="true">→</span>
              </Link>
              <Link href="/#work" className="text-link">
                See our work
              </Link>
            </div>
          </div>
          <div className="reveal grid min-w-0 gap-10 pb-3 max-lg:hidden lg:border-l lg:border-line lg:pl-10">
            <p className="font-display text-[clamp(19px,1.8vw,23px)] leading-normal">
              Software shapes how a business works.
              <br />
              Platforms decide how far it can grow.
              <br />
              Operations decide whether it lasts.
            </p>
          </div>
        </div>
      </section>

      <JollofShowcase />

      {/* Services */}
      <section id="services" className={`${section} border-t border-line`}>
        <div className={wrap}>
          <div className="reveal mb-[clamp(40px,5vw,72px)] grid items-end gap-5 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className={label}>Services</p>
              <h2 className={`${h2} mt-6`}>Cloud, platform and software engineering, end to end.</h2>
            </div>
            <p className="max-w-[52ch] text-muted">
              From product design and software delivery to cloud foundations, security and reliable operations. Bring us in
              for one piece or the whole journey.
            </p>
          </div>
          <div className="grid gap-x-[clamp(40px,6vw,96px)] md:grid-cols-2">
            {SERVICES.map(s => (
              <article key={s.title} className="reveal draw-rule group grid min-w-0 gap-2.5 pb-8 pt-7">
                <h3 className="flex items-baseline gap-3 text-[26px] leading-tight transition-colors group-hover:text-brand-blue">
                  {s.title}
                  <span aria-hidden="true" className="-translate-x-2 text-[20px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </h3>
                <p className="max-w-[54ch] text-muted">{s.body}</p>
                <p className="caps text-[11px] leading-[1.7] text-muted">
                  {s.tags.map((tag, i) => (
                    <span key={tag}>
                      {i > 0 && ' · '}
                      <span className={tag === s.highlight ? 'text-brand-green' : ''}>{tag}</span>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The approach */}
      <section className={`${section} border-t border-line`}>
        <div className={`${wrap} grid items-center gap-[clamp(40px,7vw,110px)] lg:grid-cols-[0.9fr_1.1fr]`}>
          <div className="reveal">
            <p className={label}>The approach</p>
            <h2 className={`${h2} mt-6`}>Every platform begins with a plan, and keeps improving once it runs.</h2>
            <div className="mt-6 grid max-w-[58ch] gap-[18px] text-muted">
              <p>
                Chellrach Global Limited designs, builds and runs software and the cloud platforms behind it, for our own
                products and for clients. Each engagement starts with the business: who uses the software, what it has to do,
                and what it costs to run.
              </p>
              <p>
                From there, work moves through six stages, from discovery to day-to-day operation. What we learn in production
                feeds straight back into the next sprint.
              </p>
            </div>
          </div>
          <div className="reveal">
            <Lifecycle />
          </div>
        </div>
      </section>

      {/* Statement */}
      <section aria-label="How projects start" className="grid md:grid-cols-2">
        <div className="reveal grid content-center gap-7 bg-block px-[clamp(24px,6vw,88px)] py-[clamp(48px,7vw,104px)] text-[#eef0ea]">
          <p className="caps text-[#eef0ea]/70">How projects start</p>
          <p className="font-display text-[clamp(28px,3vw,40px)] leading-tight">
            <Words text="Some projects need a new product. Some need the platform underneath it. Most need both." step={0.05} />
          </p>
        </div>
        <figure className="reveal unveil relative m-0 min-h-[420px] overflow-hidden bg-surface-2">
          <img
            src="/showcase/network-cables.webp"
            alt="Network cables plugged into a patch panel in a server rack"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <Terminal />
        </figure>
      </section>

      {/* How we work: principles, then ways to engage */}
      <section id="how" className={section}>
        <div className={wrap}>
          <div className="reveal mb-[clamp(36px,4vw,56px)]">
            <p className={label}>How we work</p>
            <h2 className={`${h2} mt-6 max-w-[22ch]`}>Four things you can expect in everything we build.</h2>
          </div>
          <div className="grid gap-[clamp(28px,4vw,56px)] sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(([title, body]) => (
              <div key={title} className="reveal draw-rule grid content-start gap-3 pt-6 [--rule-color:var(--fg)]">
                <h3 className="text-[24px] leading-tight">{title}</h3>
                <p className="text-[15px] text-muted">{body}</p>
              </div>
            ))}
          </div>

          <h3 className="reveal mb-[clamp(28px,3vw,40px)] mt-[clamp(56px,7vw,88px)] text-[clamp(26px,2.6vw,34px)] leading-tight">
            Three ways to work with us.
          </h3>
          <div className="grid gap-[clamp(28px,4vw,56px)] md:grid-cols-3">
            {ENGAGEMENTS.map(([title, body]) => (
              <div key={title} className="reveal draw-rule grid content-start gap-3 pt-6">
                <h4 className="font-display text-[22px] leading-tight">{title}</h4>
                <p className="text-[15px] text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies: a slow scrolling strip (a wrapped list when motion is reduced) */}
      <section aria-label="Technologies we work with" className="overflow-hidden border-t border-line py-14">
        <p className={`${wrap} ${label} mb-6`}>Technologies we work with</p>
        <div className="marquee-mask">
          <div className="marquee-track flex w-max">
            {[0, 1].map(copy => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className={`m-0 flex list-none p-0 font-display text-[clamp(20px,2.2vw,28px)] leading-relaxed text-muted ${copy === 1 ? 'marquee-dup' : ''}`}
              >
                {TECHNOLOGIES.map(name => (
                  <li key={name} className="flex items-center whitespace-nowrap">
                    <span className="transition-colors hover:text-fg">{name}</span>
                    <span className="mx-6 text-line" aria-hidden="true">·</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className={`${section} border-t border-line`}>
        <div className={`${wrap} grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]`}>
          <h2 className="reveal text-[clamp(38px,5.2vw,68px)] leading-[1.06]">
            <Words text="Focus on what you do best:" />{' '}
            <em className="text-brand-green">
              <Words text="running your business." start={0.4} />
            </em>
          </h2>
          <div className="reveal grid gap-7">
            <p className="max-w-[44ch] text-muted">Tell us what you&apos;re building, improving or running, and we&apos;ll take it from there.</p>
            <Link href="/contact/" data-track="start_project_clicked" data-track-location="closing_cta" className="btn-solid justify-self-start">
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <CopyEmail />
          </div>
        </div>
      </section>
    </>
  )
}
