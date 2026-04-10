'use client'

import { useState, useEffect } from 'react'

const PRESS = [
  {
    title: 'Slate raises $1.3 million to deliver embedded lending infrastructure to Canadian platforms',
    outlet: 'BetaKit',
    url: 'https://betakit.com/slate-raises-1-3-million-to-deliver-embedded-lending-infrastructure-to-canadian-platforms/',
    date: '2026-01',
    image: '/images/press/betakit-raises.jpg',
  },
  {
    title: 'The startup bringing a piece of America\'s fintech stack to Canada',
    outlet: 'BetaKit',
    url: 'https://betakit.com/the-startup-bringing-a-piece-of-americas-fintech-stack-to-canada/',
    date: '2026-02',
    image: '/images/press/betakit-fintech-stack.png',
  },
  {
    title: 'Slate to bring lending inside business platforms',
    outlet: 'Fintech.ca',
    url: 'https://www.fintech.ca/2026/01/12/slate-to-bring-lending-inside-business-platforms/',
    date: '2026-01',
    image: '/images/press/fintech-ca.jpg',
  },
  {
    title: 'Slate: vertical SaaS runs the workflow, but lending still lives elsewhere',
    outlet: 'N49P',
    url: 'https://www.n49p.com/blog/slate-vertical-saas-runs-the-workflow-but-lending-still-lives-elsewhere',
    date: '2026-01',
    image: '/images/press/n49p.jpeg',
  },
  {
    title: 'ICYMI: Fintech funding round-up — Fimple, Slate, CheckSig and more',
    outlet: 'Fintech Futures',
    url: 'https://www.fintechfutures.com/venture-capital-funding/icymi-fintech-funding-round-up-fimple-slate-checksig-and-more',
    date: '2026-01',
    image: null,
  },
]

function PressItem({ item, index }: { item: typeof PRESS[0]; index: number }) {
  const [hover, setHover] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60 * index)
    return () => clearTimeout(t)
  }, [index])

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block no-underline transition-all duration-200 rounded-md overflow-hidden border"
      style={{
        borderColor: hover ? '#30363d' : '#1b1f24',
        background: hover ? '#0d1117' : '#010409',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(6px)',
      }}
    >
      {item.image && (
        <div className="w-full h-40 overflow-hidden">
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hover ? 'scale(1.03)' : 'scale(1)' }}
          />
        </div>
      )}
      <div className="p-4">
        <h2
          className="text-sm font-[family-name:var(--font-sans)] leading-snug transition-colors duration-200 line-clamp-2"
          style={{ color: hover ? '#e6edf3' : '#c9d1d9' }}
        >
          {item.title}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-mono text-xs text-muted">{item.outlet}</span>
          <span className="text-border">·</span>
          <span className="font-mono text-xs text-muted">{item.date}</span>
        </div>
      </div>
    </a>
  )
}

export default function PressPage() {
  return (
    <div className="py-8">
      <h1 className="font-mono text-sm text-muted mb-8">~/press</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRESS.map((item, i) => (
          <PressItem key={item.url} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
