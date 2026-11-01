import { readFileSync } from 'node:fs'

const navbar = readFileSync('src/components/Navbar.tsx', 'utf8')
const contact = readFileSync('src/components/Contact.tsx', 'utf8')
const detail = readFileSync('src/app/work/[slug]/page.tsx', 'utf8')

const checks = [
  ['Navbar qualifies detail-route section links', navbar.includes("pathname === '/' ? `#${id}` : `/#${id}`")],
  ['Navbar qualifies the logo link', navbar.includes("href={sectionHref('home')}")],
  ['Contact qualifies detail-route footer links', contact.includes("pathname === '/' ? '#home' : '/#home'")],
  ['Detail pages return to the project list', detail.includes('href="/#projects"')],
  ['Detail pages render a single label number per section', detail.includes('<span>Overview</span><span>01</span>') && detail.includes('<span>Contributions</span><span>02</span>')],
]

for (const [name, passed] of checks) {
  if (!passed) throw new Error(`Navigation regression: ${name}`)
  console.log(`✓ ${name}`)
}
