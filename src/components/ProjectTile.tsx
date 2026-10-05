'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/projects'

export default function ProjectTile({ project, index }: { project: Project; index: number }) {
  const [hover, setHover] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80 * index)
    return () => clearTimeout(t)
  }, [index])

  const isSunsetted = project.tags.includes('sunsetted')

  return (
    <Link
      href={`/projects/${project.slug}/`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block no-underline rounded-lg relative overflow-hidden"
      style={{
        background: hover ? '#0d1117' : '#010409',
        border: `1px solid ${hover ? '#30363d' : '#1b1f24'}`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.25s ease',
      }}
    >
      <div
        className="w-full h-44 flex items-center justify-center relative overflow-hidden"
        style={{
          background: hover
            ? 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)'
            : 'linear-gradient(135deg, #0d1117 0%, #010409 100%)',
          borderBottom: `1px solid ${hover ? '#30363d' : '#1b1f24'}`,
          transition: 'all 0.25s ease',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        {project.logo && project.logoFill ? (
          <img
            src={project.logo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-300"
            style={{ transform: hover ? 'scale(1.05)' : 'scale(1)', objectPosition: 'center 30%' }}
          />
        ) : project.logo ? (
          <img
            src={project.logo}
            alt=""
            className="h-14 w-auto max-w-[60%] object-contain relative z-10 transition-transform duration-300"
            style={{ transform: hover ? 'scale(1.08)' : 'scale(1)' }}
          />
        ) : (
          <span
            className="text-2xl font-bold font-[family-name:var(--font-sans)] relative z-10 transition-colors duration-200"
            style={{ color: hover ? '#e6edf3' : '#484f58' }}
          >
            {project.label}
          </span>
        )}

        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full z-10 transition-shadow duration-200"
          style={{
            background: isSunsetted ? '#484f58' : '#3fb950',
            boxShadow: hover && !isSunsetted ? '0 0 10px #3fb95066' : 'none',
          }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-baseline gap-2 mb-1.5">
          <span
            className="text-base font-semibold font-[family-name:var(--font-sans)] transition-colors duration-200"
            style={{ color: hover ? '#e6edf3' : '#c9d1d9' }}
          >
            {project.label}
          </span>
          <span className="text-xs font-mono text-muted">
            {project.name}
            {project.tld}
          </span>
        </div>

        <p className="text-sm text-muted mb-4 leading-relaxed">{project.desc}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <span
            className="text-sm font-mono text-muted transition-all duration-150"
            style={{
              opacity: hover ? 1 : 0,
              transform: hover ? 'translateX(0)' : 'translateX(-4px)',
            }}
          >
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
