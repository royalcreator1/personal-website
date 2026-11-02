'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import HeroWorkbench from './HeroWorkbench'
import './hero-showcase.css'

const scenes = [
  { focus: 'interfaces', src: '/hero-interfaces.png', alt: 'Design studies and precision plans for a luxury sedan and twin-engine aircraft in a dark engineering studio.' },
  { focus: 'systems', src: '/hero-systems-v2.png', alt: 'A black sedan with its hood open and a white twin-engine aircraft parked on visible landing gear, both grounded on the same engineering hangar floor.' },
  { focus: 'delivery', src: '/engineering-royal.png', alt: 'A black luxury sedan beneath a white twin-engine charter aircraft, an illustration of precision engineering.' },
] as const

const dwellTime = 5000

export default function HeroShowcase() {
  const [selected, setSelected] = useState(0)
  const [restart, setRestart] = useState(0)
  const [pageVisible, setPageVisible] = useState(true)
  const [inView, setInView] = useState(true)
  const [reading, setReading] = useState(false)
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const visibility = () => setPageVisible(document.visibilityState === 'visible')
    visibility()
    document.addEventListener('visibilitychange', visibility)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    if (stage.current) observer.observe(stage.current)
    return () => {
      document.removeEventListener('visibilitychange', visibility)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (selected === scenes.length - 1 || !pageVisible || !inView || reading) return
    const timer = window.setTimeout(() => setSelected(current => Math.min(current + 1, scenes.length - 1)), dwellTime)
    return () => window.clearTimeout(timer)
  }, [selected, restart, pageVisible, inView, reading])

  function select(index: number) {
    setSelected(index)
    setRestart(current => current + 1)
  }

  return (
    <div className="hero-stage" data-hero-focus={scenes[selected].focus} ref={stage}>
      <div className="hero-workspace-label"><span>Precision, from interface to infrastructure.</span><span>Engineering in practice</span></div>
      <div className="hero-scene">
        {scenes.map((scene, index) => <Image key={scene.focus} className="hero-art hero-showcase-art" data-hero-art={scene.focus} data-active={selected === index} aria-hidden={selected !== index} src={scene.src} alt={selected === index ? scene.alt : ''} width={1672} height={941} priority={index === 0} loading={index === 0 ? undefined : 'eager'} sizes="(max-width: 800px) 90vw, 62vw" />)}
      </div>
      <HeroWorkbench selected={selected} onSelect={select} onReadingChange={setReading} />
    </div>
  )
}
