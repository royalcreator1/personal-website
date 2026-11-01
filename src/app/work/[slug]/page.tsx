import Link from 'next/link'
import { notFound } from 'next/navigation'
import { profile } from '@/data/profile'
import { getPresentation, getProjectBySlug, orderedProjects, slugForProject } from '@/data/projects'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'
import ProjectVisual from '@/components/ProjectVisual'

export function generateStaticParams() {
  return orderedProjects.map(project => ({ slug: slugForProject(project.name) }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  const presentation = project && getPresentation(project.name)
  return { title: `${presentation?.title ?? project?.name ?? 'Project'} — ${profile.name}`, description: presentation?.summary ?? project?.contribution[0] }
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  const presentation = getPresentation(project.name)
  const title = presentation?.title ?? project.name
  const category = presentation?.category ?? 'Enterprise / Web application'
  const index = orderedProjects.findIndex(item => item.name === project.name)
  const previous = orderedProjects[(index - 1 + orderedProjects.length) % orderedProjects.length]
  const next = orderedProjects[(index + 1) % orderedProjects.length]
  const motif = presentation?.motif ?? 'steps'

  return (
    <>
      <a className="skip-link" href="#project-content">Skip to project</a>
      <div className="detail-header-shell"><Navbar /></div>
      <main className="detail-page" id="project-content">
        <div className="detail-wrap">
          <Link className="back-link" href="/#projects">← Back to selected work</Link>
          <p className="eyebrow">{category}<span>{project.year}</span></p>
          <h1>{title}<span className="heading-dot">.</span></h1>
          {title !== project.name && <p className="detail-client">{project.name}</p>}
          <p className="detail-intro">{presentation?.summary ?? project.contribution[0]}</p>
          <div className={`detail-cover work-visual work-visual--${motif}`}>
            <div className="work-visual-meta"><span>{title}</span><span>Interface concept</span></div>
            <ProjectVisual kind={motif} />
          </div>
          <section className="detail-section" aria-labelledby="overview-title">
            <h2 id="overview-title" className="section-label"><span>Overview</span><span>01</span></h2>
            <div className="detail-overview">
              <div className="detail-copy"><p>{presentation?.summary ?? project.contribution[0]}</p><p className="detail-scope">Scope: {project.contribution[0]}</p></div>
              <dl className="detail-meta">
                <div><dt>Role</dt><dd>{project.role}</dd></div>
                <div><dt>Organization</dt><dd>{project.company}</dd></div>
                <div><dt>Date</dt><dd>{project.year}</dd></div>
                <div><dt>Location</dt><dd>{project.location}</dd></div>
                <div><dt>Domain</dt><dd>{category}</dd></div>
                <div><dt>Technology stack</dt><dd>{project.tools}</dd></div>
              </dl>
            </div>
          </section>
          <section className="detail-section" aria-labelledby="contributions-title">
            <h2 id="contributions-title" className="section-label"><span>Contributions</span><span>02</span></h2>
            <ol className="contribution-list">{project.contribution.map((item, itemIndex) => <li key={item}><span aria-hidden="true">0{itemIndex + 1}</span><p>{item}</p></li>)}</ol>
          </section>
          <nav className="project-nav" aria-label="Project navigation">
            <Link href={`/work/${slugForProject(previous.name)}`}><small>Previous project</small><span>{getPresentation(previous.name)?.title ?? previous.name} ←</span></Link>
            <Link href={`/work/${slugForProject(next.name)}`}><small>Next project</small><span>→ {getPresentation(next.name)?.title ?? next.name}</span></Link>
          </nav>
        </div>
      </main>
      <Contact />
    </>
  )
}
