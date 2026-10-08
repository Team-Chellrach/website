import Link from 'next/link'
import { Fragment } from 'react'
import Hexagon from '@/components/Hexagon'
import Lifecycle from '@/components/home/Lifecycle'
import HexNetwork from '@/components/home/HexNetwork'
import JollofShowcase from '@/components/home/JollofShowcase'
import CopyEmail from '@/components/CopyEmail'
import Engagements from '@/components/home/Engagements'
import {
  ActivityIcon,
  ArrowRightIcon,
  CloudIcon,
  CodeIcon,
  EyeIcon,
  FileCodeIcon,
  InfinityIcon,
  LayersIcon,
  NetworkIcon,
  ShieldIcon,
  SparklesIcon,
  UnlockIcon,
  type IconComponent,
} from '@/components/icons'

const CAPABILITIES: [IconComponent, string][] = [
  [CloudIcon, 'Cloud'],
  [LayersIcon, 'Platform'],
  [InfinityIcon, 'DevOps'],
  [ActivityIcon, 'SRE'],
  [ShieldIcon, 'Security'],
  [NetworkIcon, 'Networking'],
  [CodeIcon, 'Software'],
]

const SERVICES: { icon: IconComponent; title: string; body: string; tags: string[]; software?: boolean }[] = [
  {
    icon: CloudIcon,
    title: 'Cloud architecture and migration',
    body: 'Design new cloud foundations or move existing workloads, right-sized from the start, with clear cost visibility.',
    tags: ['AWS', 'Azure', 'Google Cloud', 'Landing zones', 'AWS & Azure Well-Architected', 'Cost optimisation'],
  },
  {
    icon: LayersIcon,
    title: 'Platform engineering',
    body: 'Internal platforms on Kubernetes that let your developers ship safely, with more autonomy.',
    tags: ['Kubernetes', 'OpenShift', 'Helm', 'Self-service'],
  },
  {
    icon: InfinityIcon,
    title: 'DevOps and CI/CD',
    body: 'Automated, repeatable delivery, with every environment defined in code and every change reviewed.',
    tags: ['Terraform', 'ArgoCD', 'GitHub Actions', 'Azure DevOps'],
  },
  {
    icon: ActivityIcon,
    title: 'Site reliability and scalability',
    body: 'Telemetry from metrics, logs and traces, SLOs and incident response, plus the architecture to handle growth and traffic spikes.',
    tags: ['OpenTelemetry', 'SLOs', 'Autoscaling', 'Incident response'],
  },
  {
    icon: ShieldIcon,
    title: 'Security and DevSecOps',
    body: 'Security built into code, pipelines and infrastructure, with compliance checks automated.',
    tags: ['Vulnerability scanning', 'Secrets', 'Policy-as-code', 'IAM'],
  },
  {
    icon: NetworkIcon,
    title: 'Networking and connectivity',
    body: 'Secure, reliable connectivity between clouds, on-premises systems, services and users.',
    tags: ['VPC / VNet design', 'Hybrid & multi-cloud', 'Private endpoints', 'CDN & edge'],
  },
  {
    icon: CodeIcon,
    title: 'Software development',
    body: 'Web, mobile and smart-TV apps, and the backends and APIs behind them.',
    tags: ['Web', 'iOS & Android', 'Smart TV', 'APIs'],
    software: true,
  },
  {
    icon: SparklesIcon,
    title: 'AI and LLM integration',
    body: 'LLM-powered features in your products, retrieval over your own data, and MCP servers that connect AI assistants to your tools.',
    tags: ['LLMs', 'RAG', 'AI agents', 'MCP'],
    software: true,
  },
]

const PRINCIPLES: [IconComponent, string, string][] = [
  [ShieldIcon, 'Secure by default', 'Least-privilege access, encrypted data and scanned dependencies from the start.'],
  [FileCodeIcon, 'Everything as code', 'Infrastructure, pipelines and policies in version control: reviewed, repeatable and easy to roll back.'],
  [EyeIcon, 'Observable', 'Metrics, logs and alerts built into what we ship, so problems are spotted early, often before users notice.'],
  [UnlockIcon, 'Portable by design', 'Open tooling and standard patterns that are easy to maintain, extend or move. Your code and infrastructure stay yours.'],
]

const TECHNOLOGIES = [
  'AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'OpenShift', 'Terraform', 'Helm', 'ArgoCD',
  'GitHub Actions', 'Azure DevOps', 'GitLab CI', 'Docker', 'Prometheus', 'Grafana', 'OpenTelemetry',
  'Next.js', 'React', 'React Native', 'TypeScript', 'PostgreSQL', 'Supabase', 'Stripe', 'Sentry', 'MCP',
]

// Splits text into words that rise in one after another when the card is revealed.
function Words({ text, start = 0, step = 0.06 }: { text: string; start?: number; step?: number }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="rise inline-block" style={{ animationDelay: `${start + i * step}s` }}>
        {word}
      </span>
    </Fragment>
  ))
}

const sectionHead = 'reveal mb-11 grid max-w-[680px] gap-3.5'
const eyebrow = 'font-mono text-xs uppercase tracking-[0.12em] text-brand-blue'
const h2 = 'font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.12] tracking-tight'
const lead = 'max-w-[60ch] text-lg text-muted'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-[88px] pt-[72px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[20%] -top-[20%] h-[70%] w-[80%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--blue)_12%,transparent),transparent)]" />
          <div className="absolute -bottom-[30%] -right-[20%] h-[90%] w-[70%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--green)_13%,transparent),transparent)]" />
          <HexNetwork className="opacity-70 [mask-image:radial-gradient(ellipse_85%_110%_at_62%_45%,#000_25%,transparent_80%)] max-lg:opacity-40 dark:opacity-100 dark:max-lg:opacity-60" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className={eyebrow}>Chellrach Global Limited</p>
            <h1 className="mt-[18px] font-display text-[clamp(38px,5.4vw,62px)] font-extrabold leading-[1.04] tracking-tight">
              We design, build and run <span className="text-gradient">software and cloud platforms.</span>
            </h1>
            <p className={`${lead} mt-[22px]`}>
              Web, mobile and TV apps, and the cloud, DevOps, SRE, security and networking that keep them running. One team
              from first design to production.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact/"
                data-track="start_project_clicked"
                data-track-location="hero"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-[22px] py-[13px] text-[15px] font-semibold text-white transition-transform hover:-translate-y-px"
              >
                Start a project <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center rounded-full border border-line bg-surface px-[22px] py-[13px] text-[15px] font-semibold text-fg transition-colors hover:border-brand-blue"
              >
                Explore our services
              </Link>
            </div>
          </div>
          <Lifecycle />
        </div>
      </section>

      {/* Capabilities */}
      <section aria-label="What we do">
        <div className="reveal mx-auto flex max-w-6xl flex-wrap justify-start gap-x-[22px] gap-y-3.5 border-y border-line px-5 py-[26px] sm:justify-between">
          {CAPABILITIES.map(([Icon, label]) => (
            <Link
              key={label}
              href="/#services"
              className="hex-turn inline-flex w-[calc(50%-11px)] items-center gap-2.5 font-display text-[17px] font-bold text-fg transition-colors hover:text-brand-blue sm:w-auto"
            >
              <Hexagon icon={Icon} size="sm" />
              {label}
            </Link>
          ))}
        </div>
      </section>

      <JollofShowcase />

      {/* Services */}
      <section id="services" className="py-20 sm:py-[88px]">
        <div className="mx-auto max-w-6xl px-5">
          <div className={sectionHead}>
            <p className={eyebrow}>Services</p>
            <h2 className={h2}>Cloud, platform and software engineering, end to end.</h2>
            <p className={lead}>
              From product design and software delivery to cloud foundations, security and reliable operations. Bring us in
              for one piece or the whole journey.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: Icon, title, body, tags, software }) => (
              <article
                key={title}
                className="reveal draw-card spotlight group relative grid min-w-0 content-start gap-2.5 overflow-hidden rounded-[14px] border border-line bg-surface p-6 transition hover:-translate-y-[3px] hover:border-brand-blue/60"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100"
                />
                <span
                  className={`draw-icon grid h-[42px] w-[42px] place-items-center rounded-[11px] ${
                    software ? 'bg-brand-green/12 text-brand-green' : 'bg-brand-blue/10 text-brand-blue'
                  }`}
                >
                  <Icon className="h-[21px] w-[21px]" strokeWidth={2} />
                </span>
                <h3 className="mt-1.5 font-display text-[19px] font-bold leading-tight">{title}</h3>
                <p className="text-[15px] text-muted">{body}</p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {tags.map(tag => (
                    <li key={tag} className="rounded-md bg-surface-2 px-2 py-1.5 font-mono text-[11.5px] leading-none text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="border-y border-line bg-surface py-20 sm:py-[88px]">
        <div className="mx-auto max-w-6xl px-5">
          <div className={sectionHead}>
            <p className={eyebrow}>How we engineer</p>
            <h2 id="principles-title" className={h2}>Four things you can expect in everything we build.</h2>
          </div>
          <div className="grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(([Icon, title, body]) => (
              <div key={title} className="reveal draw-card hex-turn grid grid-cols-[44px_1fr] items-start gap-4">
                <span className="draw-icon">
                  <Hexagon icon={Icon} />
                </span>
                <div>
                  <h3 className="font-display text-[19px] font-bold">{title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section id="how" aria-labelledby="how-title" className="py-20 sm:py-[88px]">
        <div className="mx-auto max-w-6xl px-5">
          <div className={sectionHead}>
            <p className={eyebrow}>How we work</p>
            <h2 id="how-title" className={h2}>Three ways to work with us.</h2>
          </div>
          <Engagements />
        </div>
      </section>

      {/* Technologies */}
      <section aria-label="Technologies we work with" className="overflow-hidden border-y border-line py-10">
        <p className="mb-5 text-center text-sm text-muted">Technologies we work with</p>
        <div className="fade-edges">
          <div className="marquee flex w-max">
            {[0, 1].map(copy => (
              <ul key={copy} aria-hidden={copy === 1} className="flex gap-3 px-1.5">
                {TECHNOLOGIES.map(name => (
                  <li
                    key={name}
                    className="whitespace-nowrap rounded-full border border-line bg-surface px-4 py-[11px] font-mono text-sm leading-none text-fg"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="reveal draw-card cta-gradient cta-sheen relative isolate grid gap-[22px] overflow-hidden rounded-3xl p-[clamp(36px,6vw,64px)] text-white">
            <HexNetwork
              tone="onBrand"
              hex={30}
              pulses={14}
              className="-z-10 [mask-image:linear-gradient(100deg,transparent_15%,#000_60%)] max-md:[mask-image:linear-gradient(180deg,transparent_30%,#000_90%)]"
            />
            <div aria-hidden="true" className="drift hexagon absolute -bottom-20 -right-16 -z-10 h-[360px] w-80 bg-white/[0.08]" />
            <div aria-hidden="true" className="drift-slow hexagon absolute -top-10 right-[28%] -z-10 h-[120px] w-[104px] bg-white/[0.06]" />
            <h2 className="max-w-[18ch] font-display text-[clamp(30px,4.6vw,48px)] font-bold leading-[1.08] tracking-tight">
              <Words text="Focus on what you do best: running your business." />
            </h2>
            <p className="max-w-[54ch] text-lg text-white/90">
              <Words text="Tell us what you're building, improving or running, and we'll take it from there." start={0.45} step={0.025} />
            </p>
            <div className="relative flex flex-wrap items-center gap-3">
              <Link
                href="/contact/"
                data-track="start_project_clicked"
                data-track-location="closing_cta"
                className="rounded-full bg-white px-[22px] py-[13px] text-[15px] font-semibold text-[#0f1a24] transition-transform hover:-translate-y-px"
              >
                Start a project
              </Link>
              <CopyEmail />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
