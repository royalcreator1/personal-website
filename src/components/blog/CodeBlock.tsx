import 'server-only'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import kotlin from 'highlight.js/lib/languages/kotlin'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import http from 'highlight.js/lib/languages/http'
import plaintext from 'highlight.js/lib/languages/plaintext'
import CopyCodeButton from './CopyCodeButton'

hljs.registerLanguage('python', python)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('http', http)
hljs.registerLanguage('text', plaintext)

const languageLabels: Record<string, string> = {
  python: 'Python',
  kotlin: 'Kotlin',
  bash: 'Bash',
  html: 'HTML',
  http: 'HTTP',
  text: 'Plain text',
}

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  const grammar = Object.hasOwn(languageLabels, language) ? language : 'text'
  const label = languageLabels[grammar]
  // highlight.js escapes the source before adding its own syntax spans.
  // No article code is evaluated, compiled, or treated as JSX.
  const highlighted = hljs.highlight(code, { language: grammar, ignoreIllegals: true }).value

  return (
    <figure className="article-code-block" data-language={grammar}>
      <div className="code-toolbar"><span>{label}</span><CopyCodeButton /></div>
      <pre tabIndex={0} aria-label={`${label} code; scroll horizontally if needed`}><code className={`hljs language-${grammar}`} dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
    </figure>
  )
}
