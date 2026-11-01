import Link from 'next/link'
import { getArticleSummaries } from '@/lib/blog'
import BlogCard from './blog/BlogCard'
import SectionLabel from './SectionLabel'

export default function Writing() {
  const articles = getArticleSummaries()

  return (
    <section id="writing" className="section writing-section wrap">
      <SectionLabel number="06">Blog / Field notes</SectionLabel>
      <div className="section-heading"><h2>Notes from building real systems.</h2><p>Practical lessons from application development, backend architecture, and the integrations in between.</p></div>
      <div className="writing-grid">{articles.map(article => <BlogCard key={article.id} article={article} />)}</div>
      <div className="writing-section-footer"><span>{articles.length} articles</span><Link className="text-link" href="/blog">Browse all posts <span aria-hidden="true">↗</span></Link></div>
    </section>
  )
}
