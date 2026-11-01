'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { profile } from '@/data/profile'
import SectionLabel from './SectionLabel'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const pathname = usePathname()
  const homeHref = pathname === '/' ? '#home' : '/#home'
  const sending = status === 'sending'

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const nextErrors: Record<string, string> = {}
    if (!data.name?.trim()) nextErrors.name = 'Please enter your name.'
    if (!data.email?.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) nextErrors.email = 'Please enter a valid email address.'
    if (!data.message?.trim()) nextErrors.message = 'Tell me a little about your project.'
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name.trim(), email: data.email.trim(), message: data.message.trim() }),
      })
      if (!response.ok) throw new Error('Message could not be sent')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  function edit(event: React.FormEvent<HTMLFormElement>) {
    if (status !== 'sending') setStatus('idle')
    const field = event.target as HTMLInputElement | HTMLTextAreaElement
    if (field.name && errors[field.name]) {
      setErrors(current => {
        const next = { ...current }
        delete next[field.name]
        return next
      })
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <SectionLabel number="07">Contact / The next chapter</SectionLabel>
        <div className="contact-grid">
          <div className="contact-intro">
            <p className="eyebrow">Have an idea worth building?</p>
            <h2>Let’s make it<br /><span>work beautifully.</span></h2>
            <p className="contact-copy">A new application, a challenging integration, or a better experience for your users. Let’s talk about what you have in mind.</p>
            <a className="button" href={`mailto:${profile.email}`}>Start a conversation <span aria-hidden="true">↗</span></a>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone} <span aria-hidden="true">↗</span></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
              <p>{profile.location}</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={submit} onInput={edit} noValidate aria-busy={sending}>
            <div className="form-heading"><h3>Tell me about your project</h3><p>Share the idea, the challenge, and what you’d like to achieve.</p></div>
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" autoComplete="name" placeholder="How should I address you?" required maxLength={120} disabled={sending} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
            {errors.name && <p id="contact-name-error" className="field-error">{errors.name}</p>}
            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} disabled={sending} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
            {errors.email && <p id="contact-email-error" className="field-error">{errors.email}</p>}
            <label htmlFor="contact-message">What would you like to build?</label>
            <textarea id="contact-message" name="message" rows={4} placeholder="A little context goes a long way…" required maxLength={5000} disabled={sending} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
            {errors.message && <p id="contact-message-error" className="field-error">{errors.message}</p>}
            <button type="submit" className="button" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
            <p className="form-status" role="status" aria-live="polite">{sending ? 'Sending your message…' : status === 'success' ? 'Your message was sent. Thank you for getting in touch.' : status === 'error' ? <>Your message could not be sent. Please <a href={`mailto:${profile.email}`}>email me directly</a>.</> : ''}</p>
          </form>
        </div>
        <footer>
          <a className="footer-name" href={homeHref}>{profile.name}</a>
          <span>© {new Date().getFullYear()}</span>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={homeHref}>Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
