import { CheckIcon, ClipboardCheckIcon, RepeatIcon, TargetIcon, type IconComponent } from '../icons'

const cardClass =
  'reveal draw-card spotlight group relative flex flex-col gap-4 overflow-hidden rounded-[14px] border border-line bg-surface p-6 transition hover:-translate-y-[3px] hover:border-brand-blue/60'

function CardTop({ icon: Icon, title, body }: { icon: IconComponent; title: string; body: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100"
      />
      <span className="draw-icon grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[11px] bg-brand-blue/10 text-brand-blue">
        <Icon className="h-[21px] w-[21px]" strokeWidth={2} />
      </span>
      <div>
        <h3 className="font-display text-[17px] font-bold">{title}</h3>
        <p className="mt-1.5 text-[15px] text-muted">{body}</p>
      </div>
    </>
  )
}

// Small illustrations of each way of working. They animate when the card
// scrolls into view and replay on hover; they are complete at rest.
export default function Engagements() {
  return (
    <div className="grid gap-[18px] md:grid-cols-3">
      <article className={cardClass}>
        <CardTop icon={TargetIcon} title="Fixed-scope projects" body="A clear outcome, timeline and price. New products, migrations, platform builds." />
        <div aria-hidden="true" className="mt-auto grid gap-2 rounded-xl bg-surface-2 p-3.5">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map(i => (
              <span key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                <span className="seg block h-full rounded-full bg-gradient-brand" style={{ animationDelay: `${0.3 + i * 0.25}s` }} />
              </span>
            ))}
          </div>
          <div className="flex justify-between font-mono text-[11.5px] text-muted">
            <span>Milestones</span>
            <span className="pop inline-flex items-center gap-1 text-brand-green" style={{ animationDelay: '1.6s' }}>
              Delivered <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </article>

      <article className={cardClass}>
        <CardTop
          icon={ClipboardCheckIcon}
          title="Advisory and architecture reviews"
          body="An expert second opinion on your setup, costs, security or reliability, with a written plan."
        />
        <ul aria-hidden="true" className="mt-auto grid gap-2 rounded-xl bg-surface-2 p-3.5 font-mono text-[12px]">
          {['Cost', 'Security', 'Reliability'].map((item, i) => (
            <li key={item} className="flex items-center justify-between">
              <span className="text-muted">{item}</span>
              <span
                className="pop grid h-5 w-5 place-items-center rounded-full bg-brand-green text-white"
                style={{ animationDelay: `${0.4 + i * 0.35}s` }}
              >
                <CheckIcon className="h-3 w-3" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className={cardClass}>
        <CardTop icon={RepeatIcon} title="Monthly support retainers" body="Ongoing hands-on help to run, maintain and improve your platform." />
        <div aria-hidden="true" className="mt-auto flex items-center gap-4 rounded-xl bg-surface-2 p-3.5">
          <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-dashed border-line">
            <span className="orbit absolute inset-0">
              <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gradient-brand" />
            </span>
            <span className="font-mono text-[10px] text-muted">monthly</span>
          </span>
          <ul className="grid gap-1 font-mono text-[11.5px] text-muted">
            <li>patches · upgrades</li>
            <li>cost reviews</li>
            <li>advice when needed</li>
          </ul>
        </div>
      </article>
    </div>
  )
}
