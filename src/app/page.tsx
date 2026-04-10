import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

const PROJECTS = [
  { name: 'theasulist', tld: '.com', desc: 'campus events, no friction' },
  { name: 'getvibecheck', tld: '.com', desc: 'vibe-coded code review' },
  { name: 'usebreazy', tld: '.com', desc: 'breathwork, simplified' },
  { name: 'flyto', tld: '.dev', desc: 'deploy anywhere, fast' },
  { name: 'tryslatehq', tld: '.com', desc: 'fintech infrastructure' },
]

export default function Home() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="py-12">
      {/* hero */}
      <div className="mb-16">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-accent mb-4">
          devin
        </h1>
        <p className="font-[family-name:var(--font-sans)] text-muted text-lg leading-relaxed max-w-lg">
          builder. i make things, ship them, and write about what i learn along the way.
        </p>
      </div>

      {/* projects preview */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-mono text-sm text-muted">~/projects</h2>
          <Link href="/projects" className="font-mono text-xs text-muted hover:text-accent transition-colors">
            all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROJECTS.slice(0, 4).map((p) => (
            <div key={p.name} className="border border-border rounded-md p-4 hover:border-muted transition-colors">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green" />
                <span className="text-accent font-medium">{p.name}</span>
                <span className="text-muted">{p.tld}</span>
              </div>
              <p className="text-sm text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* recent writing */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-mono text-sm text-muted">~/blog</h2>
          <Link href="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors">
            all &rarr;
          </Link>
        </div>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <h3 className="font-[family-name:var(--font-serif)] text-xl text-accent group-hover:opacity-70 transition-opacity">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-1 text-sm text-muted line-clamp-2">{post.excerpt}</p>
              )}
              {post.date && (
                <time className="text-xs font-mono text-muted mt-1 block">
                  {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
