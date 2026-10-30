import type { Metadata } from 'next'
import { EB_Garamond, Lato } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const ebGaramond = EB_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
})

const lato = Lato({
  variable: '--font-sans',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://devin.cx'),
  title: 'devin',
  description: 'builder, tinkerer, launcher of things',
}

function Nav() {
  return (
    <header className="w-full max-w-3xl mx-auto pt-12 pb-8 px-4">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm text-muted hover:text-accent transition-colors"
        >
          ~/devin
        </Link>
        <div className="flex gap-5 font-mono text-sm">
          <Link href="/blog" className="text-muted hover:text-accent transition-colors">
            blog
          </Link>
          <Link href="/press" className="text-muted hover:text-accent transition-colors">
            press
          </Link>
          <Link href="/about" className="text-muted hover:text-accent transition-colors">
            about
          </Link>
        </div>
      </nav>
      <div className="h-px bg-border mt-4" />
    </header>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${lato.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-16">
          {children}
        </main>
        <footer className="w-full border-t border-border">
          <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted">
            <span>devin.cx</span>
            <div className="flex gap-4">
              <a href="https://x.com/devinpicciolini" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">twitter</a>
              <a href="https://www.linkedin.com/in/devinpicciolini/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">linkedin</a>
              <a href="mailto:dpicciolini@gmail.com" className="hover:text-accent transition-colors">email</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
