'use client'

import { useEffect } from 'react'

export default function PageEffects() {
  useEffect(() => {
    const elements = document.querySelectorAll('.section-heading, .editorial, .capability-card, .work-card, .experience-row, .skill-card, .education-card')
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: .06, rootMargin: '0px 0px 40px 0px' })
    elements.forEach(element => {
      element.classList.add('reveal-ready')
      observer.observe(element)
    })
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('reveal-ready', 'is-visible')) }
  }, [])
  return <div className="page-progress" aria-hidden="true" />
}
