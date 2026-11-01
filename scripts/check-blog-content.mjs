import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../src/content/blog/', import.meta.url))
const { articles } = JSON.parse(readFileSync(join(root, 'articles.json'), 'utf8'))
const verification = JSON.parse(readFileSync(join(root, 'extraction-verification.json'), 'utf8'))
const expectedIds = ['0bdcfb91a745', 'f380583bf50b', 'd9c4b0dc6e30', '1b11d0863b9b', '1293665633f7', '00ad24061524']
const allowedTypes = new Set(['heading', 'paragraph', 'list', 'code', 'table', 'blockquote', 'divider'])
const ordered = [...articles].sort((a, b) => a.featuredRank - b.featuredRank)
const normalizeText = value => value.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')

// Compare the semantic rendering input with the original editable Markdown.
// This independently catches missing/reordered paragraphs, list items, quotations,
// table cells, and closing text even when the Markdown checksum still passes.
function semanticText(block) {
  switch (block.type) {
    case 'heading': return block.text
    case 'paragraph':
    case 'blockquote': return block.markdown
    case 'list': return block.itemsMarkdown.join('\n')
    case 'code': return block.code
    case 'table': return [block.headers, ...block.rows].map(row => row.join(' | ')).join('\n')
    case 'divider': return ''
    default: throw new Error(`Unknown content block: ${block.type}`)
  }
}

assert.equal(articles.length, 6, 'The handoff must contain exactly six complete articles')
assert.deepEqual(ordered.map(article => article.id), expectedIds, 'Featured order must match the six-article handoff')
assert.equal(new Set(articles.map(article => article.slug)).size, 6, 'Article slugs must be unique')
assert.deepEqual(ordered.map(article => article.featuredRank), [1, 2, 3, 4, 5, 6])

for (const article of ordered) {
  const check = verification.articles.find(item => item.id === article.id)
  assert.ok(check, `Missing handoff integrity record for ${article.id}`)
  const markdown = readFileSync(join(root, article.markdownFile), 'utf8')
  const checksum = createHash('sha256').update(markdown).digest('hex')
  assert.equal(checksum, check.sha256, `Original Markdown changed: ${article.markdownFile}`)
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()
  assert.equal(body, article.bodyMarkdown.trim(), `Full Markdown differs from JSON: ${article.slug}`)
  assert.equal(article.fullTextIncluded, true)
  assert.equal(article.images.length, 0, 'The supplied reading content is text-only')
  assert.match(article.publishedAt, /^\d{4}-\d{2}-\d{2}$/)
  assert.ok(Number.isFinite(article.sourceReadingMinutes) && article.sourceReadingMinutes > 0)
  assert.ok(article.bodyBlocks.every(block => allowedTypes.has(block.type)), `Unsupported block in ${article.slug}`)
  const blocks = article.bodyBlocks
  const titlePrefix = `# ${article.title}\n\n`
  assert.ok(article.bodyMarkdown.startsWith(titlePrefix), `Original title missing: ${article.slug}`)
  let sourceBody = article.bodyMarkdown.slice(titlePrefix.length)
  if (article.subtitle) {
    const subtitlePrefix = `## ${article.subtitle}\n\n`
    assert.ok(sourceBody.startsWith(subtitlePrefix), `Original subtitle missing: ${article.slug}`)
    sourceBody = sourceBody.slice(subtitlePrefix.length)
  }
  sourceBody = sourceBody.replace(/^```[^\n]*(?:\n|$)/gm, '')
  assert.equal(normalizeText(blocks.map(semanticText).join('\n')), normalizeText(sourceBody), `Semantic content omitted, changed, or reordered: ${article.slug}`)
  const code = blocks.filter(block => block.type === 'code')
  const tables = blocks.filter(block => block.type === 'table')
  const headings = blocks.filter(block => block.type === 'heading')
  assert.equal(code.length, article.codeBlockCount)
  assert.equal(code.length, check.renderableCodeBlocks)
  assert.equal(tables.length, article.tableCount)
  assert.ok(headings.every(block => block.level === 2 || block.level === 3), 'Metadata must be the only h1')
  assert.deepEqual(headings.map(({ level, text }) => ({ level, text })), article.toc, `Contents lost a heading: ${article.slug}`)

  // Compare each renderable code string with its source fence, byte for byte.
  // Only the fence's own final newline is omitted in the semantic representation.
  const fences = [...article.bodyMarkdown.matchAll(/^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/gm)]
  assert.equal(fences.length, code.length, `A fenced example was lost: ${article.slug}`)
  fences.forEach((fence, index) => {
    assert.equal(fence[1].trim(), code[index].language, `Code language mismatch: ${article.slug} #${index + 1}`)
    assert.equal(fence[2].replace(/\n$/, ''), code[index].code, `Code changed: ${article.slug} #${index + 1}`)
  })

  for (const table of tables) {
    assert.ok(table.headers.length > 0)
    assert.ok(table.rows.every(row => row.length === table.headers.length), 'Every comparison row needs every column')
  }
  console.log(`✓ ${article.slug}: full Markdown checksum, ${blocks.length} blocks, ${code.length} exact code/text examples, ${tables.length} tables`)
}

const kotlin = ordered.find(article => article.id === '1293665633f7')
const kotlinBlocks = kotlin.bodyBlocks.filter(block => block.type === 'code')
assert.equal(kotlinBlocks[0].code.length, 11698, 'The full Kotlin parser must be retained')
assert.ok(kotlinBlocks[0].code.includes('isValidGtin14'), 'Kotlin parser lost its final validation helper')
assert.ok(kotlinBlocks[1].code.includes('Gs1'), 'Kotlin usage example must remain after the parser')
assert.ok(kotlin.bodyBlocks.some(block => block.type === 'heading' && block.text === 'Wrap-up'))
assert.equal(kotlinBlocks[2].code, '(01) 12345678901234\n(10) LOT2025\n(17) 250630\n(21) ABC123', 'GS1 label transcription must remain text')

const backend = ordered.find(article => article.id === 'f380583bf50b')
const principles = backend.bodyBlocks.filter(block => block.type === 'heading' && block.level === 2 && /^\d+\./.test(block.text))
assert.equal(principles.length, 12, 'All twelve backend principles must remain')
const backendCode = backend.bodyBlocks.filter(block => block.type === 'code').map(block => block.code).join('\n')
assert.ok(backendCode.includes('FastAPI(') && backendCode.includes('async def'), 'Complete FastAPI example must remain')
assert.ok(backend.bodyBlocks.some(block => block.type === 'heading' && block.text === 'Summary'))

const comparison = ordered.find(article => article.id === '00ad24061524')
assert.deepEqual(comparison.bodyBlocks.filter(block => block.type === 'table').map(block => block.rows.length), [8, 5], 'Both complete comparison tables must remain')
assert.equal(articles.flatMap(article => article.bodyBlocks).filter(block => block.type === 'code').length, 40)
assert.equal(articles.flatMap(article => article.bodyBlocks).filter(block => block.type === 'table').length, 2)
console.log('✓ Six complete local articles, forty exact code/text blocks, two complete comparison tables; no article examples executed')
