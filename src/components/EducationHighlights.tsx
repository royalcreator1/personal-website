'use client'

import Image from 'next/image'
import { Activity, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Box, Sigma } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { studentRecognition } from '@/data/education'

export default function EducationHighlights() {
  const track = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ previous: false, next: false })

  const updatePosition = useCallback(() => {
    const element = track.current
    if (!element) return
    const next = { previous: element.scrollLeft > 2, next: element.scrollWidth - element.clientWidth - element.scrollLeft > 2 }
    setPosition(current => current.previous === next.previous && current.next === next.next ? current : next)
  }, [])

  useEffect(() => {
    const element = track.current
    if (!element) return
    updatePosition()
    const observer = new ResizeObserver(updatePosition)
    observer.observe(element)
    let frame = 0
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updatePosition)
    }
    window.addEventListener('resize', refresh)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', refresh)
    }
  }, [updatePosition])

  function scroll(direction: number) {
    const element = track.current
    if (!element) return
    const card = element.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(element).columnGap) || 20
    const distance = card ? card.getBoundingClientRect().width + gap : element.clientWidth * .85
    element.scrollBy({ left: distance * direction, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  function keyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      scroll(event.key === 'ArrowRight' ? 1 : -1)
    }
  }

  return (
    <div className="education-highlights">
      <div className="education-highlights-heading"><div><p className="eyebrow">A few milestones along the way</p><h2 id="education-recognition-title">Achievements &amp; certifications</h2></div><div className="education-rail-controls"><button type="button" onClick={() => scroll(-1)} disabled={!position.previous} aria-label="Previous achievement" aria-controls="education-recognition"><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => scroll(1)} disabled={!position.next} aria-label="Next achievement" aria-controls="education-recognition"><ArrowRight size={18} aria-hidden="true" /></button></div></div>
      <p className="education-rail-hint" id="education-rail-hint">Scroll or swipe to explore. Use the arrow keys when this row is focused.</p>
      <div className="education-rail" id="education-recognition" role="region" aria-labelledby="education-recognition-title" aria-describedby="education-rail-hint" tabIndex={0} ref={track} onScroll={updatePosition} onKeyDown={keyDown}>
        {studentRecognition.map(item => {
          const CredentialIcon = item.credentialIcon === 'simulation' ? Activity : item.credentialIcon === 'computation' ? Sigma : Box
          return (
          <article className="achievement-card" key={item.id}>
            <div className={`achievement-media ${item.imagePath ? '' : 'achievement-media--credential'}`}>
              {item.imagePath ? <Image src={item.imagePath} alt={item.imageAlt ?? item.title} fill sizes="(max-width: 560px) 280px, 340px" className="achievement-image" /> : <div className="credential-illustration" aria-hidden="true"><span className="credential-grid" /><CredentialIcon size={66} strokeWidth={.9} /><span className="credential-mark">{item.credentialMark ?? item.issuer}</span><span className="credential-caption">{item.credentialCaption ?? 'Course certificate'}</span></div>}
            </div>
            <div className="achievement-body"><div className="achievement-meta"><span><BadgeCheck size={12} aria-hidden="true" />{item.type}</span><span>{item.date}</span></div><h3>{item.title}</h3><p className="achievement-issuer">{item.issuer}</p><p className="achievement-description">{item.description}</p>{item.credentialId && <p className="achievement-id">Credential ID <span>{item.credentialId}</span></p>}<a className="achievement-link" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.linkLabel}: ${item.title} (opens in a new tab)`}>{item.linkLabel}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </article>
          )
        })}
      </div>
    </div>
  )
}
