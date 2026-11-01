'use client'

import { useEffect, useState } from 'react'
import type { BlogHeading } from '@/lib/blog'

export default function ArticleContents({ headings }: { headings: BlogHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let current = headings[0]?.id ?? ''
        for (const heading of headings) {
          const element = document.getElementById(heading.id)
          if (element && element.getBoundingClientRect().top <= 136) current = heading.id
          else if (element) break
        }
        setActive(current)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('hashchange', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('hashchange', update)
    }
  }, [headings])

  if (!headings.length) return null

  function list() {
    return <ol className="article-contents-list">{headings.map(heading => <li className={`contents-level-${heading.level}`} key={heading.id}><a className={active === heading.id ? 'is-active' : undefined} href={`#${heading.id}`} aria-current={active === heading.id ? 'location' : undefined} onClick={() => setActive(heading.id)}>{heading.text}</a></li>)}</ol>
  }

  return (
    <>
      <aside className="article-contents-desktop"><nav aria-label="Table of contents"><p className="article-contents-title">In this article</p>{list()}</nav></aside>
      <details className="article-contents-mobile"><summary>In this article <span aria-hidden="true">＋</span></summary><nav aria-label="Table of contents">{list()}</nav></details>
    </>
  )
}
