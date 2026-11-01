import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from './SectionLabel'
import ProjectVisual from './ProjectVisual'
import { getPresentation, orderedProjects, slugForProject } from '@/data/projects'

const projectContext: Record<string, string> = {
  mediscan: 'King’s College Hospital London · Dubai',
  onboardiq: 'Sedin Technologies',
  'efleet-ai': 'Connected mobility · Chargfy',
  sedstart: 'Sedin Technologies',
  'sales-tool-vertex-pharmaceuticals-boston': 'Vertex Pharmaceuticals · Boston',
  'synergy-marine': 'Maritime communication',
  'zivian-health': 'Healthcare infrastructure',
}

export default function Projects() {
  return (
    <section id="projects" className="section projects-section wrap">
      <SectionLabel number="02">Selected work</SectionLabel>
      <div className="section-heading"><h2>Different challenges.<br /><span className="muted">The same care.</span></h2><p>Real systems, built for real people. A closer look at the work behind the interfaces.</p></div>
      <div className="work-grid">
        {orderedProjects.map((project, index) => {
          const presentation = getPresentation(project.name)
          const slug = slugForProject(project.name)
          const title = presentation?.title ?? project.name
          return (
            <Link className={`work-card ${index < 2 ? 'work-card--lead' : ''}`} href={`/work/${slug}`} key={project.name} aria-label={`Explore ${title}`}>
              <div className={`work-visual work-visual--${presentation?.motif ?? 'bars'}`}>
                <div className="work-visual-meta"><span>{String(index + 1).padStart(2, '0')} / {presentation?.category.split(' / ')[0]}</span><span>Interface concept</span></div>
                <ProjectVisual kind={presentation?.motif ?? 'bars'} />
                <span className="work-open" aria-hidden="true"><ArrowUpRight size={21} /></span>
              </div>
              <div className="work-info"><div className="work-title-row"><h3>{title}</h3><span>{project.year}</span></div><p className="work-client">{projectContext[slug] ?? project.company}</p><p className="work-description">{presentation?.summary ?? project.contribution[0]}</p><div className="work-footer"><span>{project.role}</span><span className="work-explore">Explore project <ArrowUpRight size={14} aria-hidden="true" /></span></div></div>
            </Link>
          )
        })}
      </div>
      <div className="work-endnote"><span>From the first interaction to the last API call.</span><a className="text-link" href="#contact">Have something in mind? <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </section>
  )
}
