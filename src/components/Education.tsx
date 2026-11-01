import { Flag, GraduationCap, HeartHandshake, Plus, Users, Wrench } from 'lucide-react'
import { profile } from '@/data/profile'
import { engineeringExperiences, studentActivities } from '@/data/education'
import EducationHighlights from './EducationHighlights'
import SectionLabel from './SectionLabel'

export default function Education() {
  const education = profile.education

  return (
    <section id="education" className="section education wrap">
      <SectionLabel number="05">Education / The foundation</SectionLabel>
      <div className="education-card">
        <div className="education-card-top"><GraduationCap size={28} strokeWidth={1.4} aria-hidden="true" /><p className="period">{education.period.replace('-', '–')}<span>{education.location}</span></p></div>
        <div className="education-content">
          <p className="eyebrow">A foundation in engineering</p>
          <h2><a className="education-link" href="https://amrita.edu/iqac/" target="_blank" rel="noopener noreferrer" aria-label="Amrita School of Engineering — institutional quality information (opens in a new tab)">{education.school}<span aria-hidden="true">↗</span></a></h2>
          <p>{education.degree}</p>
        </div>
      </div>
      <details className="education-disclosure">
        <summary aria-controls="education-details">
          <span className="education-toggle-copy"><span>Student life, projects &amp; recognition</span><small>Racing teams, hands-on research, and learning by building.</small></span>
          <span className="education-toggle-icon" aria-hidden="true"><Plus size={20} /></span>
        </summary>
        <div className="education-expanded" id="education-details">
          <div className="student-intro"><div><p className="eyebrow">Beyond the classroom</p><h3>Building things was<br />part of student life.</h3></div><p>From designing an all-terrain vehicle with a student team to validating casting simulations at HAL, my college years combined engineering, leadership, and community involvement.</p></div>
          <div className="student-group-heading"><h3>Activities &amp; societies</h3><span>AMEYA Racing Team / SAE Club / AYUDH</span></div>
          <div className="student-activities">
            {studentActivities.map((activity, index) => {
              const Icon = [Users, Wrench, HeartHandshake][index]
              return <article className="student-activity-card" key={activity.id}><div className="student-card-top"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div><h4>{activity.title}</h4><p className="student-role">{activity.role}</p><ul>{activity.points.map(point => <li key={point}>{point}</li>)}</ul></article>
            })}
          </div>
          <div className="student-group-heading"><h3>Engineering in practice</h3><span>Design / Simulation / Validation</span></div>
          <div className="student-engineering">
            {engineeringExperiences.map((experience, index) => <article className="student-build-card" key={experience.id}><div className="student-build-meta"><span>{index === 0 ? <Flag size={17} aria-hidden="true" /> : <Wrench size={17} aria-hidden="true" />}{experience.period}</span><span>{experience.context}</span></div><h4>{experience.title}</h4><p className="student-role">{experience.role}</p><ul>{experience.points.map(point => <li key={point}>{point}</li>)}</ul></article>)}
          </div>
          <EducationHighlights />
        </div>
      </details>
    </section>
  )
}
