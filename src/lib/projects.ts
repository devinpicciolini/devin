export interface CaseStudySection {
  heading: string
  body: string[]
}

export interface Metric {
  value: string
  label: string
}

export interface PressLink {
  outlet: string
  title: string
  url: string
}

export interface Project {
  slug: string
  label: string
  name: string
  url: string
  tld: string
  desc: string
  tags: string[]
  logo: string | null
  logoFill: boolean

  // Case study content
  role: string
  timeframe: string
  tagline: string
  overview: string
  problem: string
  approach: CaseStudySection[]
  impact: string[]
  stack: string[]
  metrics?: Metric[]
  press?: PressLink[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'slate',
    label: 'Slate',
    name: 'tryslatehq',
    url: 'https://tryslatehq.com',
    tld: '.com',
    desc: 'embedded lending infrastructure for platforms',
    tags: ['2025', 'live', 'fintech'],
    logo: '/images/logos/slate.avif',
    logoFill: false,

    role: 'Head of Engineering & Product',
    timeframe: '2025 — Present',
    tagline: 'Bringing a piece of America\'s fintech stack to Canada — embedded lending infrastructure for vertical SaaS platforms.',
    overview:
      'Slate is an embedded lending infrastructure company that lets vertical SaaS platforms offer credit products to their end users — without becoming a lender. Vertical SaaS runs the workflow, but lending still lives elsewhere. Slate closes that gap. I lead engineering and product end-to-end: architecture, team, GTM infrastructure, partner integrations, and platform.',
    problem:
      'Small businesses in Canada are chronically underserved by traditional lenders. Meanwhile, vertical SaaS platforms already own the workflow, the data, and the customer relationship — but they can\'t legally or operationally become lenders. The gap between "we know this business better than any bank" and "but we can\'t extend credit to them" is massive. Closing it requires the right technical primitives, compliance posture, and partner motion.',
    approach: [
      {
        heading: 'Compliance-first architecture',
        body: [
          'Lending infrastructure fails when compliance is bolted on late. I designed the platform so every flow — onboarding, underwriting, disbursement, servicing, collections — emits auditable events from day one.',
          'This let us move fast on product without creating legal debt. Our legal team could answer regulator questions from logs, not tribal knowledge.',
        ],
      },
      {
        heading: 'Partner-grade APIs from day one',
        body: [
          'Every internal surface was built as an external API first. No "we\'ll clean it up later" — the API our partners use is the same one our own UI uses.',
          'This forced clean contracts, made partner integrations fast, and meant our public docs were never a lie.',
        ],
      },
      {
        heading: 'Narrative-driven GTM',
        body: [
          'I helped design and execute our public launch as a coordinated multi-surface release — founder, employees, investors, advisors, partners, press — all reinforcing the same narrative in a compressed window.',
          'The goal: collapse time-to-belief. In 30 days we outpaced direct competitors on engagement and follower growth, and all early platform conversations originated inbound. No paid acquisition.',
        ],
      },
    ],
    impact: [
      'Launched publicly in January 2026 after operating in stealth.',
      'Raised $1.3M to build out embedded lending infrastructure for Canadian platforms.',
      'Signed multiple enterprise vertical SaaS platforms in the first 30 days post-launch.',
      'First revenue collected within the launch window. Inbound demand exceeded capacity.',
      'Press coverage in BetaKit, Fintech.ca, N49P, and Fintech Futures.',
    ],
    stack: ['next.js', 'typescript', 'postgres', 'zitadel', 'docker', 'aws'],
    press: [
      {
        outlet: 'BetaKit',
        title: 'Slate raises $1.3 million to deliver embedded lending infrastructure to Canadian platforms',
        url: 'https://betakit.com/slate-raises-1-3-million-to-deliver-embedded-lending-infrastructure-to-canadian-platforms/',
      },
      {
        outlet: 'BetaKit',
        title: 'The startup bringing a piece of America\'s fintech stack to Canada',
        url: 'https://betakit.com/the-startup-bringing-a-piece-of-americas-fintech-stack-to-canada/',
      },
      {
        outlet: 'Fintech.ca',
        title: 'Slate to bring lending inside business platforms',
        url: 'https://www.fintech.ca/2026/01/12/slate-to-bring-lending-inside-business-platforms/',
      },
      {
        outlet: 'N49P',
        title: 'Slate: vertical SaaS runs the workflow, but lending still lives elsewhere',
        url: 'https://www.n49p.com/blog/slate-vertical-saas-runs-the-workflow-but-lending-still-lives-elsewhere',
      },
    ],
  },

  {
    slug: 'inngest',
    label: 'Inngest',
    name: 'inngest',
    url: 'https://www.inngest.com',
    tld: '.com',
    desc: 'a ground-up design + motion rebuild of inngest’s marketing site',
    tags: ['2026', 'live', 'open source'],
    logo: '/images/logos/inngest-cover.png',
    logoFill: true,

    role: 'Engineer — Full Site Redesign',
    timeframe: '2026',
    tagline:
      'Rebuilt Inngest’s entire marketing site from scratch — a brand-new design, a custom canvas animation engine, and bespoke illustrations on every page. My single heaviest open-source contribution.',
    overview:
      'Inngest is a venture-backed durable execution platform — queues, background jobs, workflows, and AI agents, without the infrastructure. I redesigned and rebuilt their whole marketing site from the ground up: a new visual language across every page, a hand-written canvas animation engine driving scroll-reactive motion site-wide, and custom illustrations for each section instead of stock art. It shipped as a 691-file, +73k / −10k-line change — roughly 269 new components.',
    problem:
      'Inngest does genuinely hard infrastructure, but the old marketing site didn’t look like it — it read like a generic dev-tools template and didn’t earn the trust the product deserves. The brief was a complete visual reinvention: a distinctive design with real motion and original illustration across a dozen different page types — homepage, platform, use-cases, pricing, customers, blog, changelog, the Temporal comparison — to the bar of the best developer-brand sites. And it had to land without ever taking the live site down or stalling the pages still being shipped alongside it.',
    approach: [
      {
        heading: 'A complete visual redesign — every page, from scratch',
        body: [
          'This wasn’t a reskin. I rebuilt the full surface — homepage, platform and use-case pages, pricing, customers, about, events, blog, changelog, and the Temporal comparison — as ~269 new components in a brand-new design language, with shared tokens and primitives so the whole thing reads as one product.',
          'The homepage hero anchors it: a stacked two-tone display headline with fluid, viewport-driven type sitting alongside a live, self-typing code canvas — the first thing that tells you Inngest is a serious platform.',
        ],
      },
      {
        heading: 'A custom canvas animation engine',
        body: [
          'Rather than reach for a heavy library, I wrote a Canvas 2D animation harness from scratch: HiDPI handling, a requestAnimationFrame loop, scroll and mouse tracking, and an IntersectionObserver that pauses scenes off-screen so they never burn frames or silently advance while you’re not looking — with idempotent teardown so nothing leaks.',
          'On top of it sits a scene/formation system — a 1,500-line hero scene that types real Inngest code character by character, with per-scene time-scaling and collision-free layout. Motion that reacts to scroll and pointer, not just canned loops.',
        ],
      },
      {
        heading: 'Bespoke illustrations, not stock art',
        body: [
          'Every section got its own hand-built artwork: 20-plus particle and stipple canvases (the hero dot field, customers, observability, scheduled jobs, the AI cube, the background-jobs hills), SVG flow diagrams for agent and multi-step-LLM workflows, and animated lifecycle graphics for setup → observe → scale → reliability.',
          'All of it original, on-brand, and tuned to stay smooth — illustration as a first-class part of the design system rather than decoration bolted on at the end.',
        ],
      },
      {
        heading: 'Shipped fast, static, and without a big-bang cutover',
        body: [
          'To land it safely I split the app into (v0)/(v1) route groups so each design owns its own layout — the redesign could ship page by page while legacy routes kept working. Once it was ready I graduated the feature flag and deleted the fallback.',
          'That restructure also brought full static prerendering back (a single root-layout headers() read had been forcing every route dynamic), and a focused pass — preloading the hero image and heading font, dropping a heavy background preload and an unused stylesheet — tightened the largest contentful paint.',
        ],
      },
    ],
    impact: [
      'Redesigned and rebuilt the entire marketing site from scratch — ~269 new components across a dozen page types — merged as a 691-file, +73k / −10k-line change in June 2026.',
      'Wrote a custom Canvas 2D animation engine (HiDPI, rAF loop, scroll + pointer tracking, off-screen pausing) powering scroll-reactive motion site-wide.',
      'Built 20+ bespoke section illustrations — particle/stipple canvases, SVG workflow diagrams, and animated lifecycle graphics — instead of stock imagery.',
      'A self-typing hero code canvas paired with a stacked two-tone display headline as the homepage centerpiece.',
      'Restored full static prerendering and tightened LCP while landing the redesign without ever taking the live site down.',
      'An open-source contribution to a durable execution platform used in production by teams like Cohere and Day.ai.',
    ],
    stack: ['next.js', 'react', 'typescript', 'canvas 2d', 'tailwind', 'app router'],
    press: [
      {
        outlet: 'GitHub · inngest/website',
        title: 'Marketing site redesign 2026 (#1645)',
        url: 'https://github.com/inngest/website/pull/1645',
      },
    ],
  },

  {
    slug: 'breazy',
    label: 'Breazy',
    name: 'usebreazy',
    url: 'https://usebreazy.com',
    tld: '.com',
    desc: 'one bill for all your home services',
    tags: ['2025', 'live', 'fintech'],
    logo: '/images/logos/usebreazy.png',
    logoFill: true,

    role: 'Founder & Engineer',
    timeframe: '2025 — Present',
    tagline: 'One bill. Every service. Total simplicity. An AI-powered bill consolidation platform for homes and businesses.',
    overview:
      'Breazy consolidates every recurring bill — electric, gas, water, internet, cell phone, streaming — into one simple monthly payment. The platform monitors rates 24/7, switches providers when it finds savings (only with user approval), and hands users back hours per month they used to spend managing bills.',
    problem:
      'Most people overpay on utilities and subscriptions not because better deals don\'t exist, but because finding them takes hours and switching is painful. Providers raise rates quietly. Utility companies still use payment systems from the 1990s. The average person is leaving thousands on the table every year just because optimizing their bills isn\'t worth the friction.',
    approach: [
      {
        heading: 'AI-driven rate monitoring',
        body: [
          'Built an agent layer that continuously scans providers in a user\'s region, compares against their current plan, and surfaces switches only when the savings are material.',
          'Crucially, the agent never switches without approval. Users stay in control; the AI just does the boring research.',
        ],
      },
      {
        heading: 'Ownership stays with the user',
        body: [
          'A lot of bill-management products take ownership of accounts. Breazy doesn\'t — every account stays in the user\'s name, we just consolidate the payments.',
          'This is a compliance and trust decision. It also made the product dramatically easier to build correctly.',
        ],
      },
      {
        heading: 'Modern payment rails over legacy infrastructure',
        body: [
          'Most utility companies force you into old payment systems. Breazy sits on top of legacy providers and gives users modern rails: any card, bank, digital wallet. One unified statement.',
          'Building the abstraction layer over dozens of inconsistent legacy billers was the hardest part of the product.',
        ],
      },
    ],
    impact: [
      'Live and signing up users across homes and small businesses.',
      'Average annual savings: $[TODO]/user across utilities, cell, and streaming bundles.',
      'B2B motion with property managers — instant utility verification for tenants.',
      'SOC 2 Type II posture from day one.',
    ],
    stack: ['next.js', 'typescript', 'ai', 'postgres', 'stripe', 'vercel'],
  },

  {
    slug: 'flyto',
    label: 'Flyto',
    name: 'flyto',
    url: 'https://flyto.dev',
    tld: '.dev',
    desc: 'natural language to structured flight search',
    tags: ['2024', 'sunsetted', 'ai'],
    logo: '/images/logos/flyto.png',
    logoFill: true,

    role: 'Solo Builder',
    timeframe: '2024',
    tagline: 'An AI layer on top of flight search. Type "cheap flights from YYZ to somewhere warm next weekend, under $400" and get real results.',
    overview:
      'Flyto was an experimental AI product that translated messy natural language travel queries into structured flight search JSON. The goal was to collapse the "I know vaguely what I want but searching is a pain" gap that everyone experiences with flight search UIs.',
    problem:
      'Flight search UIs force you to know exactly what you want: exact dates, exact airports, rigid filters. But most travel intent is fuzzy — "somewhere warm, mid-February, red-eye is fine, under $500." Traditional search makes you translate that into 15 dropdowns. Flyto let you just say it.',
    approach: [
      {
        heading: 'LLM as a translation layer, not a search engine',
        body: [
          'I didn\'t try to make the LLM do the search. I made it translate ambiguous intent into a strict JSON schema the flight APIs already understood.',
          'This meant the LLM couldn\'t hallucinate prices or routes. It could only structure the query. The search results were always real.',
        ],
      },
      {
        heading: 'Strict validation between the AI and the API',
        body: [
          'LLMs are sloppy. Wrong airport codes, invalid dates, impossible constraints. I built a validation layer between the AI output and the flight API that caught malformed queries before they hit production.',
          'Let the AI be sloppy. Your backend should be strict. This became a pattern I used on every AI project after.',
        ],
      },
    ],
    impact: [
      'Shipped as a working demo in a weekend. Used by [TODO] unique users in the first month.',
      'Sunsetted after learning: the flight search API economics don\'t work for a free tool. But the architecture pattern — LLM as translator, strict validation layer — became the template for every AI product I\'ve built since.',
      'The lesson: build the cheap experiment, learn from it, move on.',
    ],
    stack: ['next.js', 'openai', 'typescript', 'vercel'],
  },

  {
    slug: 'vibecheck',
    label: 'VibeCheck',
    name: 'getvibecheck',
    url: 'https://getvibecheck.com',
    tld: '.com',
    desc: 'find bars, happy hours, and drink specials nearby',
    tags: ['2022', 'live', 'consumer'],
    logo: '/images/logos/getvibecheck.png',
    logoFill: false,

    role: 'Founder & Engineer',
    timeframe: '2022 — Present',
    tagline: 'A consumer app for finding bars, happy hours, and drink specials nearby — with programmatic SEO pages for every city, neighborhood, and place type.',
    overview:
      'VibeCheck started as a simple happy-hour app and grew into a programmatic SEO machine with thousands of dynamically generated pages — places, cities, neighborhoods, best-of lists — all pulling from a live database. It\'s a case study in consumer product + SEO as a distribution strategy.',
    problem:
      'Bar discovery is broken. Google Maps tells you where things are, not what the vibe is like. Happy hour deals live in PDFs on restaurant websites nobody reads. There was an opportunity to build a structured, searchable, fast-loading layer on top of real nightlife data — and to use SEO as a growth channel instead of paid acquisition.',
    approach: [
      {
        heading: 'Programmatic SEO as the primary growth channel',
        body: [
          'Every bar, city, neighborhood, and tag combination becomes its own landing page. `/best-bars-in/toronto`, `/happy-hour/chicago`, `/neighborhood/austin/east-side`. Thousands of pages, all indexed.',
          'The architecture: server-rendered by a Node.js backend for crawlers and first paint, then hydrated on the client. Sitemap pulled live from Postgres.',
        ],
      },
      {
        heading: 'Real infrastructure at consumer scale',
        body: [
          '43,000+ user and bar images served from a custom file server (migrated from DO Spaces) with edge caching via Cloudflare.',
          'Image proxy mounted at `/img/` instead of `/api/` specifically so Cloudflare would cache it. Small change, huge latency win.',
        ],
      },
      {
        heading: 'Solo-dev shipping velocity',
        body: [
          'Built and maintained solo. SEO routes, API, mobile-friendly frontend, image pipeline, admin panel, and ops — all one person.',
          'Forced me to be ruthless about what to build and what to skip.',
        ],
      },
    ],
    impact: [
      '[TODO] monthly active users and [TODO] indexed pages driving organic traffic.',
      '5 GB of user-generated bar and drink imagery served at the edge.',
      'Ranks for long-tail queries in multiple cities without any paid acquisition.',
    ],
    stack: ['react', 'node.js', 'mysql', 'nginx', 'cloudflare'],
  },

  {
    slug: 'theasulist',
    label: 'The ASU List',
    name: 'theasulist',
    url: 'https://theasulist.com',
    tld: '.com',
    desc: 'student marketplace for buying and selling at ASU',
    tags: ['2011', 'live', 'marketplace'],
    logo: '/images/logos/theasulist.svg',
    logoFill: false,

    role: 'Founder & Engineer',
    timeframe: '2011 — Present',
    tagline: 'The student marketplace at Arizona State University. Started in 2011. Still running. A lesson in long-term compounding.',
    overview:
      'The ASU List is a student-to-student marketplace for buying and selling at Arizona State University. It started as a Facebook group, became a real web app, and has now been running for over a decade — through multiple rewrites, framework migrations, and generations of students. It\'s my longest-running project and taught me more about software longevity than anything else.',
    problem:
      'Students need to buy and sell stuff — textbooks, furniture, bikes, sublets. Craigslist is sketchy. Facebook Marketplace is noisy. A dedicated, identity-verified, school-specific marketplace solves for trust and relevance in one move.',
    approach: [
      {
        heading: 'Start ugly, ship fast, iterate forever',
        body: [
          'The first version was a PHP script with no CSS. It worked. Students used it. I rebuilt it from scratch three times over the years as my skills improved and the product demanded more.',
          'The lesson: shipping an ugly thing that works is better than planning a beautiful thing forever.',
        ],
      },
      {
        heading: 'Built for decades, not launches',
        body: [
          'Over 13 years, the ASU List survived: Laravel upgrades, React adoption, database migrations, hosting changes (shared hosting → DigitalOcean → home server), SSL transitions, and every student generation.',
          'I still maintain it. It still runs. The architecture is deliberately boring: Laravel API, Next.js frontend, MySQL, static deploys. Boring scales.',
        ],
      },
      {
        heading: 'Community as the moat',
        body: [
          'The real product isn\'t the listing form. It\'s the trust — ASU students know it\'s real, know it\'s safe, know it\'s theirs.',
          'I\'ve never done paid marketing. Every new student finds out from another student.',
        ],
      },
    ],
    impact: [
      'Over [TODO] listings posted across [TODO] years.',
      'Thousands of active student users across multiple ASU class generations.',
      'Migrated from DigitalOcean to a self-hosted setup in 2026 without downtime.',
      'Taught me everything I know about shipping software that has to keep running.',
    ],
    stack: ['laravel', 'next.js', 'mysql', 'nginx', 'cloudflare'],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
