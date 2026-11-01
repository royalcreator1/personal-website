import Link from 'next/link'
import { notFound } from 'next/navigation'
import { profile } from '@/data/profile'
import { getPresentation, getProjectBySlug, orderedProjects, slugForProject } from '@/data/projects'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'

export function generateStaticParams() {
  return orderedProjects.map(project => ({ slug: slugForProject(project.name) }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  const presentation = project && getPresentation(project.name)
  return { title: `${presentation?.title ?? project?.name ?? 'Project'} — ${profile.name}`, description: presentation?.summary ?? project?.contribution[0] }
}

function Cover({ motif, title }: { motif: string; title: string }) {
  return <div className={`detail-cover project-cover cover-${motif}`} aria-label={`${title} illustrative cover`}><div className="cover-art"><i /><i /><i /><i /><i /></div><span className="cover-title">{title}</span><span className="cover-note">Concept illustration</span></div>
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  const presentation = getPresentation(project.name)
  const title = presentation?.title ?? project.name
  const category = presentation?.category ?? (project.name.startsWith('SALES') ? 'Pharmaceuticals' : project.name === 'SYNERGY MARINE' ? 'Maritime / Communication' : project.name === 'ZIVIAN HEALTH' ? 'Healthcare / Backend' : 'Enterprise / Web application')
  const index = orderedProjects.findIndex(item => item.name === project.name)
  const previous = orderedProjects[(index - 1 + orderedProjects.length) % orderedProjects.length]
  const next = orderedProjects[(index + 1) % orderedProjects.length]
  return <main className="detail-page"><div className="opening"><Navbar /></div><div className="detail-wrap"><Link className="back-link" href="/#projects">← Back to selected work</Link><p className="eyebrow">{category}<span>{project.year}</span></p><h1>{title}<span className="heading-dot">.</span></h1>{presentation && <p className="detail-intro">{presentation.summary}</p>}<Cover motif={presentation?.motif ?? 'steps'} title={title} /><section className="detail-section"><div className="section-label"><span>01 / Overview</span><span>01</span></div><div className="detail-overview"><p className="detail-copy">{project.contribution[0]}</p><dl className="detail-meta"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Organization</dt><dd>{project.company}</dd></div><div><dt>Date</dt><dd>{project.year}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Domain</dt><dd>{category}</dd></div><div><dt>Technology stack</dt><dd>{project.tools}</dd></div></dl></div></section><section className="detail-section"><div className="section-label"><span>02 / Context</span><span>02</span></div><div className="detail-copy"><p>{project.contribution.length > 1 ? project.contribution[1] : project.contribution[0]}</p></div></section><section className="detail-section"><div className="section-label"><span>03 / Contributions</span><span>03</span></div><ol className="contribution-list">{project.contribution.map((item, itemIndex) => <li key={item}><span>0{itemIndex + 1}</span><p>{item}</p></li>)}</ol></section><section className="detail-section"><div className="section-label"><span>04 / Outcomes</span><span>04</span></div><div className="detail-copy"><p>Implementation focused on reliable workflows, clear user feedback, and maintainable integrations within the project scope described above.</p></div></section><nav className="project-nav" aria-label="Project navigation"><Link href={`/work/${slugForProject(previous.name)}`}><small>Previous project</small><span>{getPresentation(previous.name)?.title ?? previous.name} ←</span></Link><Link href={`/work/${slugForProject(next.name)}`}><small>Next project</small><span>→ {getPresentation(next.name)?.title ?? next.name}</span></Link></nav></div><Contact /></main>
}
