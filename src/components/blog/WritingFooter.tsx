import Link from 'next/link'
import { profile } from '@/data/profile'

export default function WritingFooter() {
  return (
    <section className="writing-contact" aria-labelledby="writing-contact-title">
      <div className="wrap">
        <div className="writing-contact-body"><div><p className="eyebrow">Have a project in mind?</p><h2 id="writing-contact-title">Let’s build something useful.</h2></div><Link className="button" href="/#contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
        <footer><Link className="footer-name" href="/#home">{profile.name}</Link><span>© {new Date().getFullYear()}</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#main">Back to top ↑</a></footer>
      </div>
    </section>
  )
}
