import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import BlogCard from '@/components/blog/BlogCard'
import WritingFooter from '@/components/blog/WritingFooter'
import { getArticleSummaries } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

const title = 'Blog — Jaswanth Chengalapttu'
const description = 'Notes from building real systems: six complete articles on application development, backend engineering, databases, and integrations.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: { title, description, type: 'website', url: absoluteUrl('/blog') },
  twitter: { card: 'summary', title, description },
}

export default function BlogIndex() {
  const articles = getArticleSummaries()
  return (
    <>
      <a className="skip-link" href="#main">Skip to blog</a>
      <div className="detail-header-shell"><Navbar /></div>
      <main id="main" className="blog-index wrap">
        <Link className="blog-back-link" href="/#writing">← Back to portfolio</Link>
        <div className="blog-index-label"><p className="eyebrow">Blog / Field notes</p><span>{articles.length} articles</span></div>
        <div className="blog-index-heading"><h1>Notes from building<br />real systems.</h1><p>Ideas, patterns, and lessons from the work. Complete articles, written for people who build.</p></div>
        <h2 className="sr-only">All articles</h2>
        <div className="writing-grid">{articles.map(article => <BlogCard key={article.id} article={article} />)}</div>
      </main>
      <WritingFooter />
    </>
  )
}
