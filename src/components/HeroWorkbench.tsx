'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, Code2 } from 'lucide-react'

const capabilities = [
  { label: 'Interfaces', number: '01', title: 'Clear from the first interaction.', description: 'Web and mobile experiences built around the way people work.', tools: ['React', 'Next.js', 'Kotlin'] },
  { label: 'Systems', number: '02', title: 'Built to connect.', description: 'APIs, authentication, and integrations that bring the whole application together.', tools: ['Python', 'Spring Boot', 'PostgreSQL'] },
  { label: 'Delivery', number: '03', title: 'From development to production.', description: 'Cloud infrastructure and deployment workflows that support the application beyond launch.', tools: ['AWS', 'Docker', 'CI/CD'] },
]

export default function HeroWorkbench() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<HTMLDivElement>(null)

  function move(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % capabilities.length
      : event.key === 'ArrowLeft' ? (index - 1 + capabilities.length) % capabilities.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? capabilities.length - 1 : null
    if (next === null) return
    event.preventDefault()
    setSelected(next)
    tabs.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <aside className="hero-workbench" aria-label="Explore my engineering capabilities">
      <div className="workbench-heading"><span><Code2 size={15} aria-hidden="true" /> How I build</span><span>End to end</span></div>
      <div className="workbench-tabs" role="tablist" aria-label="Engineering focus" ref={tabs}>
        {capabilities.map((capability, index) => <button key={capability.label} type="button" role="tab" id={`focus-tab-${index}`} aria-controls={`focus-panel-${index}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => move(event, index)}>{capability.label}</button>)}
      </div>
      <div className="workbench-panels">{capabilities.map((capability, index) => (
        <div className="workbench-panel" key={capability.label} role="tabpanel" id={`focus-panel-${index}`} aria-labelledby={`focus-tab-${index}`} hidden={selected !== index} aria-hidden={selected !== index} tabIndex={selected === index ? 0 : -1}>
          <span className="workbench-index">{capability.number} / {capability.label}</span>
          <h2>{capability.title}</h2>
          <p>{capability.description}</p>
          <ul aria-label="Technologies">{capability.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
        </div>
      ))}</div>
      <a className="workbench-link" href="#projects">See it in the work <ArrowUpRight size={16} aria-hidden="true" /></a>
    </aside>
  )
}
