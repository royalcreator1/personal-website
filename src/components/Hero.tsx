import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import HeroWorkbench from './HeroWorkbench'

export default function Hero() {
  return (
    <section id="home" className="hero wrap">
      <div className="hero-intro">
        <div>
          <p className="eyebrow hero-byline"><span className="status-dot" /> Jaswanth Chengalapttu <span className="byline-divider">/</span> Software engineer</p>
          <h1>Ideas into software.<br /><span>Engineered to last.</span></h1>
        </div>
        <div className="hero-aside">
          <p>I build web and mobile experiences that connect thoughtful interfaces with robust systems.</p>
          <a className="text-link" href="#projects">Explore selected work <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-stage">
        <div className="hero-workspace-label"><span>Precision, from interface to infrastructure.</span><span>Engineering in practice</span></div>
        <div className="hero-scene">
          <Image className="hero-art" src="/engineering-royal.png" alt="A black luxury sedan beneath a white twin-engine charter aircraft, an illustration of precision engineering." width={1672} height={941} priority sizes="(max-width: 800px) 90vw, 62vw" />
        </div>
        <HeroWorkbench />
      </div>
      <div className="hero-caption"><span>Based in Bengaluru, India</span><span>Full stack · Integrations · Cloud</span><a href="#about">A little about me <ArrowDown size={13} aria-hidden="true" /></a></div>
    </section>
  )
}
