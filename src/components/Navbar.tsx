'use client'

import { useEffect, useRef, useState } from 'react'

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
    <header className={`header wrap ${scrolled ? 'header-floating' : ''}`}>
      <a className="wordmark" href="#home" aria-label="Jaswanth home">JC<span>↗</span></a>
      <nav aria-label="Main navigation">
        {links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <button ref={trigger} className="menu-trigger" onClick={() => setOpen(true)}
        aria-expanded={open} aria-controls="mobile-menu">
        Menu <span aria-hidden="true">＋</span>
      </button>
      <dialog id="mobile-menu" aria-label="Navigation menu" ref={dialog}
        onCancel={event => { event.preventDefault(); close() }} onClose={() => setOpen(false)}>
        <div className="menu-top">
          <span className="wordmark">JC</span>
          <button autoFocus onClick={close}>Close ×</button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, id], index) => (
            <a key={id} href={`#${id}`} onClick={() => navigate(id)}>
              <small>0{index + 1}</small>{label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <p className="menu-invite">Building useful systems, one thoughtful interface at a time.<br /><a href={`mailto:jashuamrita360@gmail.com`}>Start a conversation ↗</a></p>
      </dialog>
    </header>
  )
}
