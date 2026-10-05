import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PROJECTS, getProjectBySlug } from '@/lib/projects'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'not found | devin' }

  return {
    title: `${project.label} | devin`,
    description: project.tagline,
    openGraph: {
      title: project.label,
      description: project.tagline,
      ...(project.logo && { images: [{ url: project.logo, alt: project.label }] }),
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const isSunsetted = project.tags.includes('sunsetted')

  return (
    <article className="py-8">
      {/* breadcrumb */}
      <Link
        href="/projects/"
        className="text-muted font-mono text-xs hover:text-accent transition-colors mb-8 inline-block"
      >
        &larr; ~/projects
      </Link>

      {/* hero */}
      <header className="mb-12">
        <div className="flex items-start gap-4 mb-6">
          {project.logo && (
            <div className="w-16 h-16 rounded-lg border border-border bg-surface flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={project.logo}
                alt=""
                className={project.logoFill ? 'w-full h-full object-cover' : 'w-10 h-10 object-contain'}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-accent leading-tight">
              {project.label}
            </h1>
            <div className="flex items-center gap-2 mt-2 font-mono text-xs">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: isSunsetted ? '#484f58' : '#3fb950' }}
              />
              <span className="text-muted">{project.timeframe}</span>
              <span className="text-border">·</span>
              <span className="text-muted">{project.role}</span>
            </div>
          </div>
        </div>

        <p className="font-[family-name:var(--font-sans)] text-lg text-foreground leading-relaxed">
          {project.tagline}
        </p>

        <div className="flex items-center gap-3 mt-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 rounded border border-border bg-surface text-accent hover:border-muted transition-colors"
          >
            visit site &rarr;
          </a>
          <span className="font-mono text-xs text-muted">
            {project.name}
            {project.tld}
          </span>
        </div>
      </header>

      {/* overview */}
      <section className="mb-12">
        <h2 className="font-mono text-xs text-muted mb-3 uppercase tracking-wider">overview</h2>
        <p className="font-[family-name:var(--font-sans)] text-base text-foreground leading-relaxed">
          {project.overview}
        </p>
      </section>

      {/* problem */}
      <section className="mb-12">
        <h2 className="font-mono text-xs text-muted mb-3 uppercase tracking-wider">the problem</h2>
        <p className="font-[family-name:var(--font-sans)] text-base text-foreground leading-relaxed">
          {project.problem}
        </p>
      </section>

      {/* approach */}
      <section className="mb-12">
        <h2 className="font-mono text-xs text-muted mb-6 uppercase tracking-wider">approach</h2>
        <div className="space-y-8">
          {project.approach.map((section, i) => (
            <div key={i}>
              <h3 className="font-[family-name:var(--font-serif)] text-xl text-accent mb-3">
                {section.heading}
              </h3>
              {section.body.map((para, j) => (
                <p
                  key={j}
                  className="font-[family-name:var(--font-sans)] text-base text-foreground leading-relaxed mb-3"
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* impact */}
      <section className="mb-12">
        <h2 className="font-mono text-xs text-muted mb-3 uppercase tracking-wider">impact</h2>
        <ul className="space-y-2">
          {project.impact.map((item, i) => (
            <li
              key={i}
              className="font-[family-name:var(--font-sans)] text-base text-foreground leading-relaxed flex gap-3"
            >
              <span className="text-muted font-mono shrink-0">&rarr;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* stack */}
      <section className="mb-12">
        <h2 className="font-mono text-xs text-muted mb-3 uppercase tracking-wider">stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* press */}
      {project.press && project.press.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-xs text-muted mb-3 uppercase tracking-wider">press</h2>
          <div className="space-y-2">
            {project.press.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-border py-2 group"
              >
                <div className="text-sm text-foreground group-hover:text-accent transition-colors">
                  {p.title}
                </div>
                <div className="font-mono text-xs text-muted mt-0.5">{p.outlet}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pt-8 border-t border-border">
        <p className="font-[family-name:var(--font-sans)] text-muted text-sm mb-3">
          want to work together or just talk shop?
        </p>
        <div className="flex gap-4 font-mono text-xs">
          <a
            href="mailto:dpicciolini@gmail.com"
            className="text-accent hover:opacity-70 transition-opacity"
          >
            dpicciolini@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/devinpicciolini/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <a
            href="https://x.com/devinpicciolini"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            twitter
          </a>
        </div>
      </section>
    </article>
  )
}
