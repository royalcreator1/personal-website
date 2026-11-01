import { Cloud, Code2, Database, GitBranch, Layers, Radio, Activity } from 'lucide-react'
import { profile } from '@/data/profile'
import SectionLabel from './SectionLabel'

const groups = [
  { title: 'Languages', skills: profile.skills.languages, Icon: Code2 },
  { title: 'Frameworks & libraries', skills: profile.skills.frameworks, Icon: Layers },
  { title: 'Databases & search', skills: profile.skills.databases, Icon: Database },
  { title: 'Cloud & infrastructure', skills: profile.skills.cloud, Icon: Cloud },
  { title: 'Messaging & streaming', skills: profile.skills.messaging, Icon: Radio },
  { title: 'Monitoring & observability', skills: profile.skills.monitoring, Icon: Activity },
  { title: 'Tools & integrations', skills: profile.skills.tools, Icon: GitBranch },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills-section wrap">
      <SectionLabel number="04">Expertise / Built with intent</SectionLabel>
      <div className="section-heading"><h2>The right tools.<br />For the whole system.</h2><p>A connected toolkit for the interface, the API, and everything running behind them.</p></div>
      <div className="skills-grid">
        {groups.map(({ title, skills, Icon }, index) => (
          <article className="skill-card" key={title}>
            <div className="skill-card-top"><Icon className="skill-icon" size={23} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div>
            <h3>{title}</h3>
            <ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
        <aside className="stack-note" aria-label="How I choose a technology stack">
          <span className="stack-note-label">A practical approach</span>
          <p>Good software starts with the problem.<br /><span>The stack follows.</span></p>
          <div className="stack-note-footer"><span>Python / Java / TypeScript</span><span aria-hidden="true">↗</span></div>
        </aside>
      </div>
    </section>
  )
}
