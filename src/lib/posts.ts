import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  coverImage?: string
  subtitle?: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []

  return fs.readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace(/\.md$/, '')
      const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, f), 'utf8'))
      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || '',
        content,
        date: data.date || '',
        coverImage: data.coverImage,
        subtitle: data.subtitle,
        draft: data.draft || false,
      }
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    content,
    date: data.date || '',
    coverImage: data.coverImage,
    subtitle: data.subtitle,
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
