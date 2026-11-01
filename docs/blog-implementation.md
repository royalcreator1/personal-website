# Local blog section

## Checkpoint

The Education and favicon changes were committed as `c154ed0` before this work began. The blog implementation is a separate, uncommitted change set.

## Pages and navigation

- Home: Blog is section 06, immediately before Contact (now 07). It shows exactly six cards in the supplied featured order, each with its own generated cover image.
- `/blog`: the same six complete articles and covers, with no media placeholders or external reading redirects.
- `/blog/[slug]`: statically generated local reading pages, with original titles, subtitles, dates, authors, and reading times.
- Blog is available in desktop and mobile navigation. Other navigation links from nested pages lead to real homepage anchors. Existing `#writing` anchors and internal CSS names remain compatible.
- A reading page’s Back to blog link targets its original card on the index. Native browser Back restores the previous index scroll position.

## Source and rendering

`src/content/blog/articles.json` is the rendering source. Its `bodyBlocks` are rendered once; the duplicate leading title/subtitle in `bodyMarkdown` is not rendered. The six original Markdown files and extraction integrity fixture are retained alongside the JSON for auditing. These files are internal source files, not public assets.

The article prose and technical examples have not been rewritten. Source benchmark figures and illustrative throughput scenarios are retained as the author supplied them; this implementation did not benchmark or execute the examples.

Article rendering uses:

- Manrope headings and metadata, Georgia prose, and system monospace code.
- Safe inline Markdown parsing with raw HTML disabled.
- Server-side syntax highlighting for Python, Kotlin, Bash, HTML, HTTP, and plain text.
- Full, uncollapsed code blocks with internal horizontal scrolling.
- Copy buttons that read only the exact code text, with accessible feedback and a selection fallback.
- Both comparison tables as native tables with column/row headers and keyboard-focusable scroll containers.
- A sticky contents list on desktop and a native collapsed contents disclosure on smaller screens.
- A compact contact invitation and the portfolio footer.

No Medium content is fetched at visitor time. Source URLs and extraction statistics stay server-side and are not public reading actions.

## Cover images

The owner's latest request supersedes the package's earlier text-only presentation requirement. The blog now uses six original generated cover images, one per article, in the portfolio's black-and-silver theme. Each cover appears on its article card and reading page. This visual addition leaves all six original article bodies, code examples, headings, lists, and tables unchanged. There are no screenshots, iframes, or empty media slots.

The selected PNGs are saved in `public/blog/` at 1672×941 pixels. They were generated with the built-in image-generation tool; the exact prompts and individual asset paths are recorded in [blog-image-prompts.md](blog-image-prompts.md). Responsive Next Image delivery is used for card and article display. Each article also includes its matching image in Open Graph, Twitter, and BlogPosting metadata.

The cover update was checked in Chromium at 320, 390, 768, 1024, and 1440 CSS pixels, plus an 844×390 landscape viewport. All six covers loaded on home/index cards and their article pages; mappings, alt text, image aspect ratios, social metadata, and the visible Blog labels were verified. No page overflow or runtime exceptions were found. All original article code still matched the rendered text exactly.

## Canonical URLs

Canonical URLs, social metadata, and BlogPosting structured data use `https://www.jashu.co.in/`, as supplied by the owner. A different deployment domain can be set with `NEXT_PUBLIC_SITE_URL`. Invalid article slugs return 404.

## Verification

Run:

```sh
npm run check:blog
npm run check:navigation
npx tsc --noEmit
npm run build
```

`check:blog` checks all six original Markdown checksums, semantic text completeness/order, every heading, all 40 exact code/text blocks, the full Kotlin parser and usage example, all twelve backend principles and FastAPI example, and both full comparison tables (eight and five data rows). Intentional editorial changes need a separate content review and corresponding source updates; the original integrity fixture should not be silently reset to mask changes.

Actual Chromium checks covered all six reading pages plus the home/index card layouts at 320, 390, 768, 1024, and 1440 CSS pixels and an 844×390 landscape viewport. No page overflow or runtime exceptions were found. Original code strings matched the rendered DOM exactly; all copy buttons were checked against those strings using a mocked clipboard to avoid altering the system clipboard. The selection fallback was also checked.

The checks confirmed the two mobile table scrollers, distinct font roles, original publication dates, one h1 per article, local navigation, contents offsets below the glass header, canonical/structured metadata, real 404 handling, six cards on home/index, and browser Back scroll restoration. Public HTML did not expose source URLs or extraction statistics. Screenshots of desktop/mobile index and reading layouts were inspected.

The production build generated all six article routes. No deployment or publication was performed. Browser verification used Chromium; Safari and Firefox were not exercised.
