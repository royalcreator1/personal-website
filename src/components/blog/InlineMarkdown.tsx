import ReactMarkdown from 'react-markdown'

/** Inline formatting only. Article examples are text, never JSX or raw HTML. */
export default function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      skipHtml
      allowedElements={['p', 'strong', 'em', 'code', 'a', 'br']}
      unwrapDisallowed
      components={{ p: ({ children: content }) => <>{content}</> }}
    >
      {children}
    </ReactMarkdown>
  )
}
