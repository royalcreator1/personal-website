import { profile } from '@/data/profile'
import SectionLabel from './SectionLabel'

export default function Experience() {
  return (
    <section id="experience" className="section experience-section wrap">
      <SectionLabel number="03">Experience / The journey</SectionLabel>
      <div className="section-heading">
        <h2>From an idea.<br />Into production.</h2>
        <p>Hands-on work across application development, enterprise integrations, and real-time systems.</p>
      </div>
      <div className="experience-list">
        {profile.experience.map((experience, index) => (
          <article className="experience-row" key={`${experience.company}-${experience.period}`}>
            <p className="period">{experience.period.replaceAll('-', '–')}<span>{experience.location}</span></p>
            <div className="experience-content">
              <div className="experience-company"><p className="eyebrow">{experience.company}</p><span className="role-badge">{index === 0 ? 'Current role' : index === 1 ? 'Client engagement' : 'Foundation'}</span></div>
              <h3>{index === 1 ? 'MLE Full Stack Engineer' : experience.role}</h3>
              {index === 1 && <p className="experience-note">Contract engagement through Sedin Technologies</p>}
              <details open={index === 0}>
                <summary>What I worked on <span aria-hidden="true">＋</span></summary>
                <ul>{experience.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
              </details>
            </div>
            <span className="row-number" aria-hidden="true">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
