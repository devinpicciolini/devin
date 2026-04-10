'use client'

import { useEffect, useRef, useState } from 'react'

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState('')

  useEffect(() => {
    ;(async () => {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#2d333b',
          primaryTextColor: '#adbac7',
          primaryBorderColor: '#444c56',
          lineColor: '#768390',
          secondaryColor: '#1c2128',
          tertiaryColor: '#2d333b',
          fontFamily: "'SF Mono', monospace",
          fontSize: '13px',
        },
      })

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
      try {
        const { svg: rendered } = await mermaid.render(id, chart.trim())
        setSvg(rendered)
      } catch {
        setSvg(`<pre style="color:#f47067">${chart}</pre>`)
      }
    })()
  }, [chart])

  return (
    <div
      ref={containerRef}
      className="my-6 p-5 bg-[#1c2128] rounded-lg border border-[rgba(68,76,86,0.4)] overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
