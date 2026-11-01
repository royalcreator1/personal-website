import { GraduationCap } from 'lucide-react'
import { profile } from '@/data/profile'
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
    </section>
  )
}
