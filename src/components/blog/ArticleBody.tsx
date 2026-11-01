import { getArticleHeadings, type BlogArticle } from '@/lib/blog'
import CodeBlock from './CodeBlock'
import InlineMarkdown from './InlineMarkdown'

export default function ArticleBody({ article }: { article: BlogArticle }) {
  const headings = new Map(getArticleHeadings(article).map(heading => [heading.blockIndex, heading]))
  let sectionTitle = 'Article'
  let tableNumber = 0

  return (
    <div className="article-prose" data-article-body>
      {article.bodyBlocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const Heading = `h${block.level}` as 'h2' | 'h3' | 'h4'
            sectionTitle = block.text
            return <Heading id={headings.get(index)?.id} key={index}>{block.text}</Heading>
          }
          case 'paragraph':
            return <p key={index}><InlineMarkdown>{block.markdown}</InlineMarkdown></p>
          case 'list': {
            const List = block.ordered ? 'ol' : 'ul'
            return <List key={index}>{block.itemsMarkdown.map((item, itemIndex) => <li key={itemIndex}><InlineMarkdown>{item}</InlineMarkdown></li>)}</List>
          }
          case 'code':
            return <CodeBlock key={index} code={block.code} language={block.language} />
          case 'blockquote':
            return <blockquote key={index}><p><InlineMarkdown>{block.markdown}</InlineMarkdown></p></blockquote>
          case 'divider':
            return <hr key={index} />
          case 'table': {
            const caption = `${sectionTitle} — comparison table ${++tableNumber}`
            return (
              <div className="article-table-scroll" key={index} role="region" aria-label={caption} tabIndex={0}>
                <table>
                  <caption className="sr-only">{caption}</caption>
                  <thead><tr>{block.headers.map((header, headerIndex) => <th key={headerIndex} scope="col"><InlineMarkdown>{header}</InlineMarkdown></th>)}</tr></thead>
                  <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row"><InlineMarkdown>{cell}</InlineMarkdown></th> : <td key={cellIndex}><InlineMarkdown>{cell}</InlineMarkdown></td>)}</tr>)}</tbody>
                </table>
              </div>
            )
          }
        }
      })}
    </div>
  )
}
