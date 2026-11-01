import Image from 'next/image'
import Link from 'next/link'
import { formatBlogDate, type BlogSummary } from '@/lib/blog'
import { getBlogCover } from '@/lib/blog-covers'

export default function BlogCard({ article }: { article: BlogSummary }) {
  const cover = getBlogCover(article.id)

  return (
    <Link id={`writing-${article.id}`} className="writing-card" href={`/blog/${article.slug}`} aria-label={`Read article: ${article.title}`}>
      {cover && <div className="writing-card-media"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, (max-width: 1467px) 30vw, 427px" /></div>}
      <div className="writing-card-content">
        <p className="writing-card-category">{article.category}</p>
        <h3 className="writing-card-title">{article.title}</h3>
        <p className="writing-card-excerpt">{article.excerpt}</p>
        <div className="writing-card-footer">
          <div className="writing-card-date"><time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time><span>{article.readingMinutes} min read</span></div>
          <span className="writing-card-action">Read article <span aria-hidden="true">↗</span></span>
        </div>
      </div>
    </Link>
  )
}
