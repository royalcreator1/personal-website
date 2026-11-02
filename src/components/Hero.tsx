import { ArrowDown } from 'lucide-react'
import HeroShowcase from './HeroShowcase'

export default function Hero() {
  return (
    <section id="home" className="hero wrap">
      <div className="hero-intro">
        <div>
          <div className="hero-identity">
            <p className="hero-name">Jaswanth Chengalapttu</p>
            <p className="hero-role"><span className="status-dot" aria-hidden="true" />Software engineer</p>
          </div>
          <h1>Ideas into software.<br /><span>Engineered to last.</span></h1>
        </div>
        <div className="hero-aside">
          <p>I build web and mobile experiences that connect thoughtful interfaces with robust systems.</p>
          <a className="text-link" href="#projects">Explore selected work <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <HeroShowcase />
      <div className="hero-caption"><span>Based in Bengaluru, India</span><span>Full stack · Integrations · Cloud</span><a href="#about">A little about me <ArrowDown size={13} aria-hidden="true" /></a></div>
    </section>
  )
}
