import 'server-only'
import source from '@/content/blog/articles.json'

export type BlogBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; fontRole?: string }
  | { type: 'paragraph'; markdown: string; fontRole?: string }
  | { type: 'list'; ordered: boolean; itemsMarkdown: string[]; fontRole?: string }
  | { type: 'code'; language: string; code: string; fontRole?: string }
  | { type: 'table'; headers: string[]; rows: string[][]; fontRole?: string; transcribedFromImage?: boolean }
  | { type: 'blockquote'; markdown: string; fontRole?: string }
  | { type: 'divider' }

export type BlogHeading = {
  id: string
  level: 2 | 3 | 4
  text: string
  blockIndex: number
}

export type BlogSummary = {
  id: string
  slug: string
  title: string
  subtitle?: string
  publishedAt: string
  author: string
  category: string
  featuredRank: number
  excerpt: string
  readingMinutes: number
}

export type BlogArticle = BlogSummary & {
  /** Internal provenance only. Never render as a public reading CTA. */
  sourceUrl: string
  sourceReadingMinutes: number
  bodyMarkdown: string
  bodyBlocks: BlogBlock[]
  toc: Array<{ level: number; text: string }>
  fullTextIncluded: boolean
  markdownFile: string
  wordCountIncludingCode: number
  codeBlockCount: number
  tableCount: number
}

type SourceArticle = Omit<BlogArticle, 'readingMinutes'>

const articles: BlogArticle[] = (source.articles as unknown as SourceArticle[])
  .map(article => ({ ...article, readingMinutes: Math.max(1, article.sourceReadingMinutes) }))
  .sort((a, b) => a.featuredRank - b.featuredRank)

export function getArticles(): BlogArticle[] {
  return articles
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find(article => article.slug === slug)
}

/** Explicitly select public card fields so source/provenance stays on the server. */
export function getArticleSummaries(): BlogSummary[] {
  return articles.map(({ id, slug, title, subtitle, publishedAt, author, category, featuredRank, excerpt, readingMinutes }) => ({
    id, slug, title, ...(subtitle ? { subtitle } : {}), publishedAt, author, category, featuredRank, excerpt, readingMinutes,
  }))
}

export function getArticleHeadings(article: BlogArticle): BlogHeading[] {
  const headings: BlogHeading[] = []
  article.bodyBlocks.forEach((block, blockIndex) => {
    if (block.type !== 'heading') return
    const slug = block.text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
    headings.push({ id: `section-${headings.length + 1}-${slug}`, level: block.level, text: block.text, blockIndex })
  })
  return headings
}

/** An original calendar date is not a timestamp; always format it in UTC. */
export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`))
}
