import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

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
