'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark-dimmed.min.css'
import Mermaid from './Mermaid'
import { useEffect, useRef, type ReactNode, type ReactElement } from 'react'

interface CodeProps {
  className?: string
  children?: ReactNode
}

function isMermaidBlock(child: ReactNode): child is ReactElement<CodeProps> {
  if (!child || typeof child !== 'object' || !('props' in child)) return false
  const props = (child as ReactElement<CodeProps>).props as CodeProps
  return typeof props.className === 'string' && props.className.includes('language-mermaid')
}

function useScrollAutoplay() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const videos = container.querySelectorAll('video')
    if (videos.length === 0) return

    videos.forEach((v) => { v.playbackRate = 1.5; v.pause() })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) video.play().catch(() => {})
          else video.pause()
        })
      },
      { threshold: 0.3 }
    )

    videos.forEach((v) => observer.observe(v))
    return () => observer.disconnect()
  }, [])

  return containerRef
}

export default function PostContent({ content }: { content: string }) {
  const containerRef = useScrollAutoplay()

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          pre({ children, ...props }) {
            if (isMermaidBlock(children)) {
              return <Mermaid chart={String(children.props.children).replace(/\n$/, '')} />
            }
            return <pre {...props}>{children}</pre>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
