import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, Flag, HeartHandshake, Users, Wrench } from 'lucide-react'
import Navbar from '@/components/Navbar'
import EducationHighlights from '@/components/EducationHighlights'
import WritingFooter from '@/components/blog/WritingFooter'
import { engineeringExperiences, studentActivities } from '@/data/education'
import { profile } from '@/data/profile'
import { absoluteUrl } from '@/lib/site'
import './student-life.css'

const title = 'The years that built me — Jaswanth Chengalapttu'
const description = 'Student life at Amrita School of Engineering: leading AMEYA Racing, building with the SAE Club, hands-on research at HAL, and achievements along the way.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/student-life') },
  openGraph: { title, description, type: 'website', url: absoluteUrl('/student-life') },
  twitter: { card: 'summary', title, description },
}

export default function StudentLifePage() {
  const activityIcons = [Users, Wrench, HeartHandshake]

  return (
    <>
      <a className="skip-link" href="#main">Skip to student life</a>
      <div className="detail-header-shell"><Navbar /></div>
      <main id="main" className="student-page wrap">
        <Link className="student-back-link" href="/#education"><ArrowLeft size={15} aria-hidden="true" /> Back to education</Link>

        <header className="student-page-hero">
          <div className="student-page-heading">
            <p className="eyebrow">Student life / A look back</p>
            <h1>The years<br /><span>that built me.</span></h1>
            <p className="student-page-lede">Racing teams, hands-on research,<br />and learning by building.</p>
          </div>
          <div className="student-era">
            <div className="student-era-top"><span className="eyebrow">The college chapter</span><span aria-hidden="true">↗</span></div>
            <p className="student-era-years">2018<span>—</span>2022</p>
            <div className="student-era-school"><GraduationMark /><div><p>Amrita School of Engineering</p><span>Bengaluru, India</span></div></div>
            <p className="student-era-degree">{profile.education.degree}</p>
          </div>
        </header>

        <div className="student-page-intro">
          <p>From designing an all-terrain vehicle with a student team to validating casting simulations at HAL, my college years combined engineering, leadership, and community involvement.</p>
          <nav className="student-chapters" aria-label="Student life chapters">
            <a href="#the-teams"><span>01</span> The teams <ArrowDown size={14} aria-hidden="true" /></a>
            <a href="#the-builds"><span>02</span> The builds <ArrowDown size={14} aria-hidden="true" /></a>
            <a href="#the-milestones"><span>03</span> The milestones <ArrowDown size={14} aria-hidden="true" /></a>
          </nav>
        </div>

        <section className="student-chapter" id="the-teams" aria-labelledby="student-teams-title">
          <div className="student-chapter-label"><p className="eyebrow">01 / The teams</p><span>Beyond the classroom</span></div>
          <div className="student-group-heading"><h2 id="student-teams-title">Better, together.</h2><p>Activities &amp; societies</p></div>
          <div className="student-activities">
            {studentActivities.map((activity, index) => {
              const Icon = activityIcons[index]
              return (
                <article className="student-activity-card" key={activity.id}>
                  <div className="student-card-top"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div>
                  <h3>{activity.title}</h3>
                  <p className="student-role">{activity.role}</p>
                  <ul>{activity.points.map(point => <li key={point}>{point}</li>)}</ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="student-chapter" id="the-builds" aria-labelledby="student-builds-title">
          <div className="student-chapter-label"><p className="eyebrow">02 / The builds</p><span>Design / Simulation / Validation</span></div>
          <div className="student-group-heading"><h2 id="student-builds-title">Learning, put to work.</h2><p>Engineering in practice</p></div>
          <div className="student-engineering">
            {engineeringExperiences.map((experience, index) => (
              <article className="student-build-card" key={experience.id}>
                <div className="student-build-meta"><span>{index === 0 ? <Flag size={17} aria-hidden="true" /> : <Wrench size={17} aria-hidden="true" />}{experience.period}</span><span>{experience.context}</span></div>
                <h3>{experience.title}</h3>
                <p className="student-role">{experience.role}</p>
                <ul>{experience.points.map(point => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <div className="student-chapter student-milestones" id="the-milestones">
          <div className="student-chapter-label"><p className="eyebrow">03 / The milestones</p><span>Recognition &amp; continued learning</span></div>
          <EducationHighlights />
        </div>
        <div className="student-page-end"><p>That curiosity still shapes how I build today.</p><Link className="text-link" href="/#projects">Explore my work <span aria-hidden="true">↗</span></Link></div>
      </main>
      <WritingFooter />
    </>
  )
}

function GraduationMark() {
  return <span className="student-era-mark" aria-hidden="true">ME</span>
}
