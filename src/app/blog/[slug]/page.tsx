import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostContent from '@/components/PostContent'
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'not found | devin' }

  const description = post.excerpt || `Read "${post.title}" by devin`
  return {
    title: `${post.title} | devin`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      ...(post.coverImage && { images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] }),
    },
    twitter: {
      card: post.coverImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="py-8">
      <header className="mb-12">
        <Link
          href="/blog"
          className="text-muted font-mono text-xs hover:text-accent transition-colors mb-8 inline-block"
        >
          &larr; ~/blog
        </Link>
        <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl leading-tight text-accent">
          {post.title}
        </h1>
        {post.date && (
          <time className="text-muted font-mono text-xs mt-4 block">
            {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
      </header>
      <div className="prose">
        <PostContent content={post.content} />
      </div>
    </article>
  )
}
