'use client'

import { useState, useEffect } from 'react'

const PROJECTS = [
  {
    name: 'theasulist',
    url: 'https://theasulist.com',
    tld: '.com',
    desc: 'campus events, no friction',
    stack: ['next.js', 'supabase', 'vercel'],
  },
  {
    name: 'getvibecheck',
    url: 'https://getvibecheck.com',
    tld: '.com',
    desc: 'vibe-coded code review',
    stack: ['ai', 'react', 'node'],
  },
  {
    name: 'usebreazy',
    url: 'https://usebreazy.com',
    tld: '.com',
    desc: 'breathwork, simplified',
    stack: ['next.js', 'motion', 'vercel'],
  },
  {
    name: 'flyto',
    url: 'https://flyto.dev',
    tld: '.dev',
    desc: 'deploy anywhere, fast',
    stack: ['go', 'docker', 'ssh'],
  },
  {
    name: 'tryslatehq',
    url: 'https://tryslatehq.com',
    tld: '.com',
    desc: 'fintech infrastructure',
    stack: ['next.js', 'postgres', 'zitadel'],
  },
]

function Tile({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hover, setHover] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80 * index)
    return () => clearTimeout(t)
  }, [index])

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block no-underline transition-all duration-200 rounded-md p-6 relative overflow-hidden border"
      style={{
        background: hover ? '#0d1117' : '#010409',
        borderColor: hover ? '#30363d' : '#1b1f24',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      <div
        className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-green transition-shadow duration-200"
        style={{ boxShadow: hover ? '0 0 8px #3fb95066' : 'none' }}
      />

      <div className="mb-2">
        <span className="text-lg font-semibold text-foreground" style={{ color: hover ? '#e6edf3' : '#c9d1d9' }}>
          {project.name}
        </span>
        <span className="text-lg text-muted font-normal">{project.tld}</span>
      </div>

      <p className="text-sm text-muted mb-4">{project.desc}</p>

      <div className="flex gap-1.5 flex-wrap">
        {project.stack.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted"
            style={{ letterSpacing: '0.02em' }}
          >
            {t}
          </span>
        ))}
      </div>

      <span
        className="absolute bottom-6 right-6 text-sm font-mono text-muted transition-all duration-150"
        style={{ opacity: hover ? 1 : 0, transform: hover ? 'translateX(0)' : 'translateX(-4px)' }}
      >
        &rarr;
      </span>
    </a>
  )
}

export default function ProjectsPage() {
  return (
    <div className="py-8">
      <h1 className="font-mono text-sm text-muted mb-8">~/projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROJECTS.map((p, i) => (
          <Tile key={p.name} project={p} index={i} />
        ))}
      </div>
    </div>
  )
}
