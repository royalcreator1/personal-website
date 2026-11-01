import { Cloud, Code2, Network, Server } from 'lucide-react'
import SectionLabel from './SectionLabel'

const capabilities = [
  { Icon: Code2, title: 'Interfaces that make sense.', label: 'Web & mobile', copy: 'React, Next.js, and Android experiences that turn complex workflows into clear next steps.' },
  { Icon: Server, title: 'Systems with a solid foundation.', label: 'Backend engineering', copy: 'APIs, authentication, and data models built around the way your application needs to work.' },
  { Icon: Network, title: 'Everything, connected.', label: 'Integrations', copy: 'Connecting enterprise platforms, payments, real-time communication, and external APIs.' },
  { Icon: Cloud, title: 'Ready for the real world.', label: 'Cloud & delivery', copy: 'AWS infrastructure, containers, and deployment pipelines that take an application into production.' },
]

export default function About() {
  return (
    <section id="about" className="section about-section wrap">
      <SectionLabel number="01">The engineer behind the work</SectionLabel>
      <div className="editorial">
        <h2>Thoughtful interfaces.<br /><span>Serious engineering.</span></h2>
        <div className="body-copy">
          <p className="lead">I’m Jaswanth, a software engineer at Sedin Technologies. I connect the experience people see with the systems they depend on.</p>
          <p>My background is in mechanical engineering. Today, that same curiosity about how things work shapes the web, mobile, and backend applications I build.</p>
          <p>From hospital inventory to connected fleets, I work across the stack to turn complex requirements into software people can use.</p>
          <a className="about-link text-link" href="#experience">A closer look at my experience <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="capabilities">
        {capabilities.map(({ Icon, title, label, copy }, index) => (
          <article className="capability-card" key={label}>
            <div className="capability-top"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div>
            <p className="capability-label">{label}</p>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
