import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'about | devin',
  description: 'Learn more about Devin.',
}

export default function AboutPage() {
  return (
    <div className="py-8">
      <h1 className="font-mono text-sm text-muted mb-10">~/about</h1>

      <div className="prose">
        <p>
          Hi, I&apos;m Devin. I&apos;m building a company from the ground up, and this is where
          I share what I&apos;m learning along the way.
        </p>

        <p>
          This site is my attempt to think out loud about the challenges, decisions,
          and lessons that come with building something from zero to one. I write about
          technology, leadership, product development, and the realities of startup life.
        </p>

        <h2>Why I Write</h2>

        <p>
          Writing forces clarity. When I sit down to write about a problem or idea,
          I have to organize my thoughts in a way that conversation doesn&apos;t require.
          The act of writing is often where I discover what I actually think.
        </p>

        <p>
          I also believe in building in public. The startup journey can feel isolating,
          and I hope that sharing my experiences — both successes and failures — might help
          others navigating similar paths.
        </p>

        <h2>Get in Touch</h2>

        <p>
          I&apos;m always interested in connecting with other builders, investors, and curious
          minds. The best way to reach me is on{' '}
          <a href="https://x.com/devinpicciolini" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          ,{' '}
          <a href="https://www.linkedin.com/in/devinpicciolini/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          , or{' '}
          <a href="mailto:dpicciolini@gmail.com">email</a>.
        </p>
      </div>
    </div>
  )
}
