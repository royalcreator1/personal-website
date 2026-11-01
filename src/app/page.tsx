import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import PageEffects from '@/components/PageEffects'
import Writing from '@/components/Writing'

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <PageEffects />
      <div className="opening"><Navbar /></div>
      <main id="main">
        <div className="opening"><Hero /></div>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Writing />
        <Contact />
      </main>
    </>
  )
}
