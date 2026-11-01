'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

const links = [
  ['About', 'about'],
  ['Work', 'projects'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['Contact', 'contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const pathname = usePathname()
  const sectionHref = (id: string) => pathname === '/' ? `#${id}` : `/#${id}`
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      dialog.current?.showModal()
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 72)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (pathname !== '/') return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-15% 0px -65% 0px' })
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  function close() {
    dialog.current?.close()
    setOpen(false)
    trigger.current?.focus()
  }

  function navigate(id: string) {
    close()
    requestAnimationFrame(() => {
      const target = document.getElementById(id)
      target?.setAttribute('tabindex', '-1')
      target?.focus({ preventScroll: true })
    })
  }

  return (
    <><header className={`header wrap ${scrolled ? 'header-floating' : ''} ${pathname !== '/' ? 'header-detail' : ''}`}>
      <a className="wordmark" href={sectionHref('home')} aria-label="Jaswanth home">JC<span className="wordmark-dot">.</span></a>
      <nav aria-label="Main navigation">
        {links.filter(([, id]) => id !== 'contact').map(([label, id]) => <a key={id} href={sectionHref(id)} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      </nav>
      <a className="header-cta" href={sectionHref('contact')}>Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></a>
      <button ref={trigger} className="menu-trigger" onClick={() => setOpen(true)}
        aria-expanded={open} aria-controls="mobile-menu">
        Menu <span aria-hidden="true">＋</span>
      </button>
    </header>
      <dialog id="mobile-menu" aria-label="Navigation menu" ref={dialog}
        onCancel={event => { event.preventDefault(); close() }} onClose={() => setOpen(false)}>
        <div className="menu-top">
          <span className="wordmark">JC</span>
          <button autoFocus onClick={close}>Close ×</button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, id], index) => (
            <a key={id} href={sectionHref(id)} onClick={() => navigate(id)}>
              <small>0{index + 1}</small>{label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <p className="menu-invite">Building useful systems, one thoughtful interface at a time.<br /><a href={`mailto:jashuamrita360@gmail.com`}>Start a conversation ↗</a></p>
      </dialog>
    </>
  )
}
