import { profile } from '@/data/profile';
import SectionLabel from './SectionLabel';
export default function Education() { const e = profile.education; return <section id="education" className="section education wrap"><SectionLabel number="05">Education</SectionLabel><div className="education-row"><p className="period">{e.period}<span>{e.location}</span></p><div><h2>{e.school}</h2><p>{e.degree}</p></div><span className="education-symbol" aria-hidden="true">↗</span></div></section>; }
