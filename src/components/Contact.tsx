'use client';
import { useState } from 'react';
import { profile } from '@/data/profile';
import SectionLabel from './SectionLabel';
export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
    async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const form = e.currentTarget; const data = Object.fromEntries(new FormData(form)) as Record<string, string>; const nextErrors: Record<string, string> = {}; if (!data.name?.trim()) nextErrors.name = 'Please enter your name.'; if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) nextErrors.email = 'Please enter a valid email address.'; if (!data.message?.trim()) nextErrors.message = 'Please add a short message.'; setErrors(nextErrors); if (Object.keys(nextErrors).length) return; setStatus('sending'); try {
        const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!response.ok)
            throw new Error();
        setStatus('success');
        form.reset();
    }
    catch {
        setStatus('error');
    } }
    return <section id="contact" className="contact"><div className="wrap"><SectionLabel number="06">Contact / Let’s connect</SectionLabel><div className="contact-grid"><div><h2>Good things start<br />with a conversation<span className="heading-dot">.</span></h2><a className="button" href={`mailto:${profile.email}`}>Let’s talk <span aria-hidden="true">↗</span></a><div className="contact-links"><a href={`mailto:${profile.email}`}>{profile.email} ↗</a><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone} ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><p>{profile.location}</p></div></div><form onSubmit={submit} noValidate><h3>Send a message</h3><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined}/>{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}<label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}/>{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}<label htmlFor="message">What’s on your mind?</label><textarea id="message" name="message" rows={3} required maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined}/>{errors.message && <p id="message-error" className="field-error">{errors.message}</p>}<button className="button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button><p className="form-status" role="status">{status === 'success' ? 'Your message was sent. Thank you for getting in touch.' : status === 'error' ? <>Message could not be sent. Please <a href={`mailto:${profile.email}`}>email me directly</a>.</> : ''}</p></form></div><footer><a className="footer-name" href="#home">{profile.name}</a><span>© {new Date().getFullYear()}</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#home">Back to top ↑</a></footer></div></section>;
}
