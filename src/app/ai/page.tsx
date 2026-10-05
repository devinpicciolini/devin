import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI that survives contact with your business — Devin Picciolini',
  description:
    'I build AI systems for owner-run businesses that take the repetitive work off the floor and keep doing it on a Sunday at 6am when nobody is watching.',
  robots: { index: false, follow: false },
}

const EMAIL = 'devin@picciolini.org'
const MAILTO = `mailto:${EMAIL}?subject=AI%20for%20my%20business&body=What%20we%20do%3A%0AWhere%20the%20week%20goes%3A%0ALocations%3A%0A`

/* ---------- small pieces ---------- */

function Cta({ label = 'Start with a call' }: { label?: string }) {
  return (
    <a
      href={MAILTO}
      className="group inline-flex items-center gap-3 font-mono text-sm border border-accent/60 text-accent px-6 py-3.5 rounded-md hover:bg-accent hover:text-background hover:border-accent transition-colors duration-200"
    >
      {label}
      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
    </a>
  )
}

function Rule({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-xs text-muted tabular-nums">{n}</span>
      <span className="font-mono text-xs text-muted uppercase tracking-[0.18em]">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-serif)] text-[1.75rem] md:text-4xl leading-[1.15] text-accent mb-7 max-w-2xl">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.0625rem] leading-[1.75] text-foreground mb-5">{children}</p>
}

function Em({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>
}

/* ---------- the system diagram ---------- */

function SystemDiagram() {
  const box = (x: number, w: number, label: string, sub: string, accent = false) => (
    <g key={label}>
      <rect
        x={x}
        y={44}
        width={w}
        height={46}
        rx={5}
        fill={accent ? '#0d1117' : '#0d1117'}
        stroke={accent ? '#3fb950' : '#21262d'}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={64}
        textAnchor="middle"
        fill="#c9d1d9"
        fontSize="10.5"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={78}
        textAnchor="middle"
        fill="#6e7681"
        fontSize="8.5"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {sub}
      </text>
    </g>
  )

  const arrow = (x1: number, x2: number) => (
    <g key={`a${x1}`}>
      <line x1={x1} y1={67} x2={x2 - 5} y2={67} stroke="#30363d" strokeWidth={1} />
      <path d={`M${x2 - 5} 67 l-4 -3 v6 z`} fill="#30363d" />
    </g>
  )

  return (
    <div className="border border-border rounded-md bg-surface p-4 my-8 overflow-x-auto">
      <svg viewBox="0 0 700 190" className="w-full min-w-[600px]" role="img" aria-label="How the system is shaped: a request comes in, the agent decides, low-confidence work routes to a person, the rest is done in your existing tools, and everything is written to a log.">
        {box(0, 120, 'REQUEST', 'call · text · form')}
        {arrow(120, 160)}
        {box(160, 130, 'DECIDE', 'reads your rules')}
        {arrow(290, 330)}
        {box(330, 150, 'ACT', 'in the tools you own', true)}
        {arrow(480, 520)}
        {box(520, 180, 'CONFIRM', 'log · receipt · alert')}

        {/* escalation branch */}
        <line x1={225} y1={90} x2={225} y2={132} stroke="#30363d" strokeWidth={1} strokeDasharray="3 3" />
        <path d="M225 137 l-3 -5 h6 z" fill="#30363d" />
        <rect x={150} y={139} width={150} height={34} rx={5} fill="#0d1117" stroke="#21262d" />
        <text x={225} y={154} textAnchor="middle" fill="#c9d1d9" fontSize="10" fontFamily="ui-monospace, monospace">
          ASK A HUMAN
        </text>
        <text x={225} y={166} textAnchor="middle" fill="#6e7681" fontSize="8.5" fontFamily="ui-monospace, monospace">
          unsure · high stakes
        </text>

        {/* retry self-loop on ACT */}
        <path
          d="M460 90 v18 h-95 v-13"
          fill="none"
          stroke="#30363d"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <path d="M365 90 l-3 5 h6 z" fill="#30363d" />
        <text x={480} y={112} fill="#6e7681" fontSize="8.5" fontFamily="ui-monospace, monospace">
          on failure: resume, don&apos;t restart
        </text>

        <text x={0} y={22} fill="#6e7681" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
          THE SHAPE OF EVERY SYSTEM I BUILD
        </text>
      </svg>
    </div>
  )
}

/* ---------- the log ---------- */

function LogLine({ t, tag, children }: { t: string; tag: string; children: React.ReactNode }) {
  const color =
    tag === 'DONE' ? 'text-green' : tag === 'HELD' ? 'text-[#e3b341]' : 'text-[#6cb6ff]'
  return (
    <div className="flex gap-3 py-[3px]">
      <span className="text-muted shrink-0 tabular-nums">{t}</span>
      <span className={`${color} shrink-0 w-11`}>{tag}</span>
      <span className="text-[#adbac7]">{children}</span>
    </div>
  )
}

function DayLog() {
  return (
    <div className="rounded-md border border-border overflow-hidden bg-[#0d1117] my-8">
      <div className="h-8 bg-[rgba(110,118,129,0.08)] border-b border-border flex items-center px-3.5 gap-2">
        <span className="w-[7px] h-[7px] rounded-full bg-[#f85149]" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#e3b341]" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#3fb950]" />
        <span className="font-mono text-[10px] text-muted ml-2 tracking-wide">
          a normal Tuesday — nobody touched anything
        </span>
      </div>
      <div className="p-4 font-mono text-[11.5px] md:text-[12.5px] leading-relaxed overflow-x-auto">
        <LogLine t="04:12" tag="DONE">
          overnight voicemail transcribed, quoted, texted back — booked 9:30 Thu
        </LogLine>
        <LogLine t="06:30" tag="DONE">
          daily brief sent: 41 jobs on the board, 2 techs short on Friday
        </LogLine>
        <LogLine t="08:47" tag="RETRY">
          scheduling API timed out — retried, picked up where it left off, no double booking
        </LogLine>
        <LogLine t="10:02" tag="DONE">
          14 supplier invoices read and filed; 1 price change flagged
        </LogLine>
        <LogLine t="11:26" tag="HELD">
          customer asking about a refund → sent to you, not answered
        </LogLine>
        <LogLine t="15:40" tag="DONE">
          38 review requests sent to customers finished this week
        </LogLine>
        <LogLine t="18:05" tag="DONE">
          tomorrow&apos;s routes drafted; 3 conflicts resolved before they happened
        </LogLine>
      </div>
    </div>
  )
}

/* ---------- page ---------- */

export default function AiPage() {
  return (
    <div className="pt-10 pb-4">
      {/* ── hero ─────────────────────────────────────────── */}
      <header className="mb-24">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green" />
          </span>
          <p className="font-mono text-[11px] text-muted uppercase tracking-[0.18em]">
            AI systems for owner-run businesses · 1–20 locations
          </p>
        </div>

        <h1 className="font-[family-name:var(--font-serif)] text-[2.5rem] md:text-[3.75rem] leading-[1.06] text-accent mb-7">
          Your business runs on work
          <br />
          nobody should be doing.
        </h1>

        <p className="text-xl leading-[1.7] text-foreground max-w-xl mb-4">
          I build AI systems that take that work off the floor — the calls, the quotes, the
          paperwork, the chasing — and keep doing it at six on a Sunday morning when nobody is
          watching.
        </p>
        <p className="text-lg leading-[1.7] text-muted max-w-xl mb-10">
          Not a chatbot. Not a subscription to one more tool you&apos;ll stop opening. Software that
          does the job.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <Cta />
          <span className="font-mono text-xs text-muted">
            30 minutes · free · no deck
          </span>
        </div>
      </header>

      {/* ── 01 the gap ───────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="01" label="the gap" />
        <H2>Why the AI you already tried didn&apos;t stick.</H2>
        <P>
          Nearly every owner I talk to tells me the same story with different details in it.
          Someone on the team started using ChatGPT last year. For about three weeks it felt like
          magic — it wrote the newsletter, cleaned up the job descriptions, answered a question
          nobody had time to answer. Then it slowly became one more tab that nobody opens.
        </P>
        <P>
          Nothing was wrong with the AI. The problem is that it lived in a browser window and your
          business doesn&apos;t. It doesn&apos;t know that the Tuesday crew starts at six, that you
          never quote that job under eight hundred, that the supplier in Hamilton is always late.
          It can draft the email but it can&apos;t send it, can&apos;t book the appointment,
          can&apos;t update the schedule, and can&apos;t tell you afterwards that it did.
        </P>
        <P>
          <Em>
            The distance between a model that can write and a system that can work is where all the
            value is.
          </Em>{' '}
          It&apos;s also, conveniently, exactly where most people selling you AI right now stop.
        </P>
      </section>

      {/* ── 02 what it looks like ────────────────────────── */}
      <section className="mb-24">
        <Rule n="02" label="what it looks like" />
        <H2>Four things worth building, in almost any business.</H2>
        <P>
          The vertical matters less than owners expect. Restaurants, clinics, salons, trades,
          retail, gyms, property management — the bottleneck is nearly always the same shape:
          repetitive work strung between tools that don&apos;t talk to each other, held together by
          whoever happens to be on shift.
        </P>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {[
            {
              t: 'The line that never rings out',
              d: 'Calls, texts, web forms and emails answered in your voice, at any hour, by something that knows your hours, your prices, and what you don’t do. It qualifies the job, books it into your calendar, and follows up twice with the ones who go quiet. A missed call isn’t a lost message — it’s a booked job that went to whoever answered next.',
            },
            {
              t: 'Quotes that don’t depend on who’s working',
              d: 'A few photos and three lines of notes go in; a priced, branded, consistent quote comes out in under a minute. Your best estimator’s judgement, written down once and applied every time — including on the Saturday they’re not there.',
            },
            {
              t: 'The paperwork pile, handled',
              d: 'Invoices, receipts, packing slips, timesheets and statements read, checked against what you ordered, and filed into your accounting system. Anything that doesn’t reconcile gets flagged for a person rather than quietly guessed at. This is the least glamorous thing I build and usually the first one to pay for itself.',
            },
            {
              t: 'One honest number, every morning',
              d: 'Sales, labour, bookings and stock from every location, pulled into six lines of plain text at 6:30am — on your phone, before you’ve opened anything. Most owners have this data. Almost none of them have it in one place at a useful hour.',
            },
          ].map((c) => (
            <div key={c.t} className="py-7 group">
              <h3 className="font-[family-name:var(--font-serif)] text-xl md:text-2xl text-accent mb-2.5">
                {c.t}
              </h3>
              <p className="text-[1.0625rem] leading-[1.7] text-muted group-hover:text-foreground transition-colors duration-300">
                {c.d}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[1.0625rem] leading-[1.75] text-foreground mt-8">
          And then there&apos;s the fifth one, which is usually the best: the thing only you know
          how to do. The ordering instinct, the scheduling puzzle you solve in your head every
          Sunday night, the rule for pricing the weird jobs.{' '}
          <Em>That knowledge is currently stored in one person and leaves when they do.</Em> Writing
          it into a system that runs it a hundred times a week is the highest-leverage work I do.
        </p>
      </section>

      {/* ── 03 the day ───────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="03" label="a day of it" />
        <H2>What a working system actually does while you sleep.</H2>
        <P>
          This is a composite — an illustration of a normal day&apos;s output for a small
          multi-location service business, not a screenshot of your future. But the shape is real,
          and so is the important part: seven things happened, one of them failed and recovered on
          its own, and exactly one was handed to a human on purpose.
        </P>
        <DayLog />
      </section>

      {/* ── 04 durability ────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="04" label="the hard part" />
        <H2>Anyone can make it work once. The job is the other 364 days.</H2>
        <P>
          A demo is easy. I could build you something impressive this afternoon that would fall over
          in a month, and a lot of people will happily sell you exactly that. What&apos;s hard —
          and what I&apos;ve spent my career on — is making software that survives the real world:
          the supplier&apos;s system going down mid-order, the customer who types something nobody
          anticipated, the model having an off day, the quiet drift where something is still running
          but no longer quite right.
        </P>
        <P>Six things separate the two. All six are non-negotiable in what I build.</P>

        <div className="mt-9 space-y-7">
          {[
            {
              t: 'It assumes things will break',
              d: 'Every task is built to fail safely and pick up where it left off, not start over. Nothing gets double-booked, double-charged or double-sent because a connection dropped halfway through. A 3am outage becomes a delay you never hear about.',
            },
            {
              t: 'It knows the edge of what it knows',
              d: 'The system carries an explicit line between what it may decide alone and what it must escalate. Money, medical, legal, contracts, an angry customer, or simply low confidence — those stop and wait for you. A system that never says “I’m not sure” isn’t confident, it’s unsupervised.',
            },
            {
              t: 'It writes everything down',
              d: 'Every decision, every message sent, every number changed, with the reasoning attached. When a customer calls about something that happened three weeks ago, you can read exactly what was done and why. No black box, no shrugging.',
            },
            {
              t: 'It’s tested, not vibe-checked',
              d: 'I take a set of real cases out of your actual history — including the awkward ones — and turn them into a test the system has to pass. Every change runs against them before it goes anywhere near a customer. This is ordinary practice in serious software and almost unheard of in AI consulting.',
            },
            {
              t: 'It’s watched',
              d: 'It reports that it is alive and behaving. If it stops, slows down, or starts producing work that looks unlike its own, I know, and so do you. You should never learn that something broke from a customer.',
            },
            {
              t: 'It’s yours',
              d: 'Accounts in your name, code in your repository, built on tools any competent developer can pick up. If you want to hire someone else in a year, or bring it in-house, or fire me — you can, and nothing stops working. I think that’s the bar, and I think it’s telling how few people meet it.',
            },
          ].map((f, i) => (
            <div key={f.t} className="flex gap-5">
              <span className="font-mono text-xs text-muted pt-1.5 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-serif)] text-xl text-accent mb-1.5">
                  {f.t}
                </h3>
                <p className="text-[1.0625rem] leading-[1.7] text-muted">{f.d}</p>
              </div>
            </div>
          ))}
        </div>

        <SystemDiagram />
      </section>

      {/* ── 05 process ───────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="05" label="how it goes" />
        <H2>From first call to something running: about a month.</H2>
        <div className="mt-9 space-y-8">
          {[
            {
              n: 'Week 0',
              t: 'A conversation',
              d: 'Thirty minutes, free. You walk me through a normal week and I ask a lot of questions — mostly about what annoys you. If I don’t see anything here worth building, I’ll say so plainly and we’ll both get on with our day.',
            },
            {
              n: 'Week 1',
              t: 'A written plan',
              d: 'The two or three highest-value things to automate, what each is worth to you in hours or dollars, what each costs to build, and which one I’d do first and why. Written in plain English, not consultant. It’s yours to keep and act on with or without me.',
            },
            {
              n: 'Weeks 2–4',
              t: 'The first one, built and live',
              d: 'I build the highest-value system and run it against real work, alongside your existing process, so nothing is at risk while it proves itself. You watch it handle actual customers before you commit another dollar.',
            },
            {
              n: 'After',
              t: 'Handover, or the next one',
              d: 'Documentation in language your team can read, training for whoever touches it, and the keys. From there I either stay on to watch it and build the next thing, or step back entirely. I’m genuinely fine with both, and I’ve set it up so that’s true.',
            },
          ].map((s) => (
            <div key={s.n} className="flex flex-col sm:flex-row gap-2 sm:gap-7">
              <span className="font-mono text-xs text-muted pt-2 sm:w-20 shrink-0 uppercase tracking-wider">
                {s.n}
              </span>
              <div className="border-l border-border pl-6 pb-1">
                <h3 className="font-[family-name:var(--font-serif)] text-xl text-accent mb-1.5">
                  {s.t}
                </h3>
                <p className="text-[1.0625rem] leading-[1.7] text-muted">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 who ───────────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="06" label="who you'd be hiring" />
        <H2>I build systems that move money for a living.</H2>
        <P>
          I&apos;m Devin. I&apos;m the founder and CTO of{' '}
          <a
            href="https://tryslatehq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-[3px] decoration-border hover:decoration-accent transition-colors"
          >
            Slate
          </a>
          , a financial technology company where automated decisions put real capital into real
          businesses. In that world &ldquo;it works most of the time&rdquo; is not a thing you get
          to say. Everything I know about making AI dependable, I learned somewhere the cost of
          being wrong was immediate and measured in dollars.
        </P>
        <P>
          I take on a small number of small-business projects a year, deliberately. Partly because
          I like them, and partly because this is where the technology makes a difference you can
          feel. Software that saves a four-hundred-person company two percent is a rounding error
          in someone&apos;s quarterly deck. Software that gives an owner back ten hours a week
          changes what their life looks like.
        </P>
        <P>
          You work with me. Not an account manager, not a junior with a template, not a team
          offshore you&apos;ll never meet.
        </P>
      </section>

      {/* ── 07 fit ───────────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="07" label="fit" />
        <H2>Who this is and isn&apos;t for.</H2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          <div className="border border-border rounded-md p-6 bg-surface">
            <h3 className="font-mono text-xs text-green uppercase tracking-[0.15em] mb-4">
              A good fit
            </h3>
            <ul className="space-y-3 text-[0.95rem] leading-relaxed text-muted">
              <li>You&apos;re the owner, and you can decide without a committee.</li>
              <li>Somewhere between one and twenty locations.</li>
              <li>There&apos;s work being done by hand that&apos;s done the same way every time.</li>
              <li>Your systems are a mess. Everyone&apos;s are. That&apos;s the job.</li>
              <li>You want to own it, not rent it.</li>
            </ul>
          </div>
          <div className="border border-border rounded-md p-6 bg-surface">
            <h3 className="font-mono text-xs text-muted uppercase tracking-[0.15em] mb-4">
              Not a fit
            </h3>
            <ul className="space-y-3 text-[0.95rem] leading-relaxed text-muted">
              <li>You want AI because the word is in the air right now.</li>
              <li>The real goal is cutting staff. That&apos;s not where the money is at your size.</li>
              <li>You need it live next week.</li>
              <li>Nobody on your side has an hour a week to give me.</li>
              <li>You&apos;d rather buy a tool than change how something is done.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 08 pricing ───────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="08" label="what it costs" />
        <H2>Fixed prices, agreed before anything starts.</H2>
        <P>
          You&apos;ll know the number before I write a line of code. No hourly billing, no scope
          creep conversations, no invoice that surprises you.
        </P>
        <div className="mt-9 divide-y divide-border border-y border-border">
          {[
            {
              t: 'The plan',
              p: '$2,500',
              d: 'A week inside your business and a written roadmap you can act on with or without me. Credited in full against a build if you go ahead.',
            },
            {
              t: 'The first build',
              p: 'typically $8k – $25k',
              d: 'One real system, live and doing work, in roughly a month. Fixed price, agreed up front, including the testing and documentation.',
            },
            {
              t: 'Keeping it alive',
              p: 'from $1,500 / month',
              d: 'Optional. I watch it, fix it, tune it as your business changes, and build the next thing. Month to month — cancel whenever.',
            },
          ].map((tier) => (
            <div key={tier.t} className="py-6 flex flex-col sm:flex-row gap-2 sm:gap-8">
              <div className="sm:w-52 shrink-0">
                <h3 className="font-[family-name:var(--font-serif)] text-xl text-accent leading-tight">
                  {tier.t}
                </h3>
                <p className="font-mono text-xs text-green mt-1.5">{tier.p}</p>
              </div>
              <p className="text-[1.0625rem] leading-[1.7] text-muted">{tier.d}</p>
            </div>
          ))}
        </div>
        <p className="text-[1.0625rem] leading-[1.75] text-foreground mt-7">
          The test I hold myself to:{' '}
          <Em>if a build can&apos;t pay for itself inside a year</Em> — in hours you get back or
          revenue you stop leaving on the table — I&apos;ll tell you before you&apos;ve spent
          anything.
        </p>
      </section>

      {/* ── 09 questions ─────────────────────────────────── */}
      <section className="mb-24">
        <Rule n="09" label="fair questions" />
        <H2>The five things owners ask me first.</H2>
        <div className="mt-9 space-y-8">
          {[
            {
              q: 'Is this going to replace my people?',
              a: 'No — and at your size that isn’t where the money is anyway. Ten or fifteen people doing skilled work is not a payroll problem, it’s your entire advantage. What I take away is the work that makes them worse at the job you actually hired them for.',
            },
            {
              q: 'What if it says something wrong to a customer?',
              a: 'Anything customer-facing starts in a mode where you see and approve every message before it sends. It earns its way to acting alone on the routine things by being right hundreds of times in a row, and it never earns it on the risky ones — those always stop and wait for a person.',
            },
            {
              q: 'Our systems are a mess. Is that a problem?',
              a: 'A shared inbox, a point-of-sale from 2014, a booking tool nobody likes and eleven spreadsheets is the completely normal starting condition. I have never once turned up to something tidy. Untangling it is most of the value.',
            },
            {
              q: 'What happens if you disappear?',
              a: 'You own the accounts and the code, it’s documented in plain language, and it runs on standard tools with a large pool of people who know them. Nothing about this arrangement traps you, and that’s by design — it’s the first question I’d ask if I were you.',
            },
            {
              q: 'How much of my time is this going to take?',
              a: 'A couple of hours in the first week while I learn how the business actually runs, then roughly thirty minutes a week. If it starts costing you more than that, I’ve built it wrong.',
            },
          ].map((f) => (
            <div key={f.q}>
              <h3 className="font-[family-name:var(--font-serif)] text-xl text-accent mb-2">
                {f.q}
              </h3>
              <p className="text-[1.0625rem] leading-[1.7] text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── close ────────────────────────────────────────── */}
      <section className="border-t border-border pt-14 pb-6">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-[2.75rem] leading-[1.12] text-accent mb-6 max-w-xl">
          Let&apos;s find the expensive part of your week.
        </h2>
        <p className="text-lg leading-[1.7] text-foreground max-w-xl mb-9">
          Thirty minutes, no cost, nothing to sit through. The worst outcome is that you leave with
          a clear, honest picture of where this technology would and wouldn&apos;t help you — which
          is worth having either way, and which almost nobody will give you for free.
        </p>
        <Cta label={`Email me — ${EMAIL}`} />
        <p className="font-mono text-xs text-muted mt-8">
          Devin Picciolini · founder &amp; CTO, Slate
        </p>
      </section>
    </div>
  )
}
