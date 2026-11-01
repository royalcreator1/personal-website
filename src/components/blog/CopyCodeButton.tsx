'use client'

import { useEffect, useRef, useState } from 'react'

export default function CopyCodeButton() {
  const [feedback, setFeedback] = useState('')
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current)
  }, [])

  async function copy(event: React.MouseEvent<HTMLButtonElement>) {
    const code = event.currentTarget.closest('figure')?.querySelector('pre code')
    if (!code) return
    if (timeout.current) clearTimeout(timeout.current)

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(code.textContent ?? '')
      setCopied(true)
      setFeedback('The complete code block was copied to the clipboard.')
    } catch {
      const selection = window.getSelection()
      if (selection) {
        const range = document.createRange()
        range.selectNodeContents(code)
        code.closest('pre')?.focus({ preventScroll: true })
        selection.removeAllRanges()
        selection.addRange(range)
        setFeedback('Code selected. Press Control+C or Command+C to copy.')
      } else {
        setFeedback('Copy unavailable. Select the code and use your device’s copy command.')
      }
      setCopied(false)
    }

    timeout.current = setTimeout(() => {
      setCopied(false)
      setFeedback('')
    }, 5000)
  }

  return (
    <span className="code-copy-control">
      <button type="button" className="code-copy-button" aria-label="Copy the complete code block" onClick={copy}>{copied ? 'Copied' : 'Copy code'}</button>
      <span className="sr-only" role="status" aria-live="polite">{feedback}</span>
    </span>
  )
}
