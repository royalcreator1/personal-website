import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ArticleBody from '@/components/blog/ArticleBody'
import ArticleContents from '@/components/blog/ArticleContents'
import WritingFooter from '@/components/blog/WritingFooter'
import { formatBlogDate, getArticleBySlug, getArticleHeadings, getArticles } from '@/lib/blog'
import { getBlogCover } from '@/lib/blog-covers'
import { absoluteUrl } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return getArticles().map(article => ({ slug: article.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()
  const title = `${article.title} — Jaswanth’s blog`
  const url = absoluteUrl(`/blog/${article.slug}`)
  const cover = getBlogCover(article.id)
  const images = cover ? [{ url: absoluteUrl(cover.src), alt: cover.alt }] : undefined
  return {
    title,
    description: article.excerpt,
    authors: [{ name: article.author, url: absoluteUrl('/') }],
    alternates: { canonical: url },
    openGraph: { title, description: article.excerpt, type: 'article', url, publishedTime: `${article.publishedAt}T00:00:00Z`, authors: [article.author], images },
    twitter: { card: 'summary_large_image', title, description: article.excerpt, images },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()
  const articles = getArticles()
  const index = articles.findIndex(item => item.slug === article.slug)
  const previous = articles[(index - 1 + articles.length) % articles.length]
  const next = articles[(index + 1) % articles.length]
  const url = absoluteUrl(`/blog/${article.slug}`)
  const cover = getBlogCover(article.id)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    ...(cover ? { image: absoluteUrl(cover.src) } : {}),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Person', name: article.author, url: absoluteUrl('/') },
    datePublished: `${article.publishedAt}T00:00:00Z`,
    articleSection: article.category,
    inLanguage: 'en',
    timeRequired: `PT${article.readingMinutes}M`,
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to article</a>
      <div className="detail-header-shell"><Navbar /></div>
      <main id="main" className="reading-page wrap">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        <Link className="blog-back-link" href={`/blog#writing-${article.id}`}>← Back to blog</Link>
        <article aria-labelledby="article-title">
          <header className="article-header">
            <p className="eyebrow">{article.category}</p>
            <h1 id="article-title">{article.title}</h1>
            {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}
            <div className="article-meta"><span>By {article.author}</span><time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time><span>{article.readingMinutes} min read</span></div>
          </header>
          {cover && <figure className="article-cover"><Image src={cover.src} alt={cover.alt} fill priority sizes="(max-width: 1244px) 90vw, 1120px" /></figure>}
          <div className="article-layout"><div className="article-content"><ArticleBody article={article} /></div><ArticleContents headings={getArticleHeadings(article)} /></div>
        </article>
        <nav className="article-pagination" aria-label="Article navigation">
          <Link href={`/blog/${previous.slug}`}><span>← Previous article</span><strong>{previous.title}</strong></Link>
          <Link href={`/blog/${next.slug}`}><span>Next article →</span><strong>{next.title}</strong></Link>
        </nav>
      </main>
      <WritingFooter />
    </>
  )
}
