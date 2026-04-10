import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'blog | devin',
  description: 'Thoughts on building stuff, tinkering and launching cool shit.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="py-8">
      <h1 className="font-mono text-sm text-muted mb-10">~/blog</h1>

      {posts.length === 0 ? (
        <p className="text-muted font-[family-name:var(--font-sans)]">nothing here yet.</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl text-accent group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h2>
                {post.date && (
                  <time className="text-xs font-mono text-muted mt-2 block">
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {post.excerpt && (
                  <p className="mt-3 text-muted font-[family-name:var(--font-sans)] leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="mt-16 pt-10 border-t border-border">
        <p className="font-[family-name:var(--font-sans)] text-muted mb-4">
          want new posts in your inbox?
        </p>
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/picciolini"
          method="post"
          target="_blank"
          className="flex gap-3"
        >
          <input
            type="email"
            name="email"
            placeholder="you@email.com"
            required
            className="font-[family-name:var(--font-sans)] text-sm px-3 py-2 bg-transparent border border-border rounded-md focus:outline-none focus:border-accent transition-colors w-full max-w-xs text-foreground placeholder:text-muted"
          />
          <button
            type="submit"
            className="font-[family-name:var(--font-sans)] text-sm px-4 py-2 bg-accent text-background rounded-md hover:opacity-80 transition-opacity"
          >
            subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
