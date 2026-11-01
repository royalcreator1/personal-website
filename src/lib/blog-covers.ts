export type BlogCover = {
  src: string
  alt: string
}

const blogCovers: Record<string, BlogCover> = {
  '0bdcfb91a745': {
    src: '/blog/streamlit-state.png',
    alt: 'Modular glass application panels connected by a polished chrome link on a black background.',
  },
  'f380583bf50b': {
    src: '/blog/backend-principles.png',
    alt: 'Connected metallic server blocks arranged as a precise, modular backend system.',
  },
  'd9c4b0dc6e30': {
    src: '/blog/alembic-migrations.png',
    alt: 'Two branching chrome tracks converge into a single path, representing database migrations.',
  },
  '1b11d0863b9b': {
    src: '/blog/django-sessions.png',
    alt: 'A metallic session token links a glass interface panel to a structured data store.',
  },
  '1293665633f7': {
    src: '/blog/gs1-parser.png',
    alt: 'An abstract barcode is scanned and separated into structured metallic data fields.',
  },
  '00ad24061524': {
    src: '/blog/framework-comparison.png',
    alt: 'Three balanced architectural modules in black and silver illustrate a framework comparison.',
  },
}

/** Covers are kept separate from the original, complete article content. */
export function getBlogCover(id: string): BlogCover | undefined {
  return blogCovers[id]
}
