import { profile } from './profile'

export const projectPresentation: Record<string, {
  title: string
  category: string
  summary: string
  motif: string
  slug: string
}> = {
  MEDISCAN: { title: 'MEDISCAN', category: 'Healthcare / Android & integration', summary: 'Connecting hospital inventory workflows with Oracle Fusion — from scanning to receiving.', motif: 'scan', slug: 'mediscan' },
  ONBOARDIQ: { title: 'ONBOARDIQ', category: 'Assessment / Full stack platform', summary: 'An end-to-end examination platform, from candidate assessment to proctoring and evaluation.', motif: 'grid', slug: 'onboardiq' },
  'EFLEET.AI': { title: 'EFLEET.AI', category: 'Electric mobility / Fleet systems', summary: 'Vehicle onboarding, telemetry, and charging data brought into a connected fleet platform.', motif: 'orbit', slug: 'efleet-ai' },
  SEDSTART: { title: 'SEDSTART', category: 'Developer tools / QA automation', summary: 'Turning recorded screen sessions into step-by-step test scripts.', motif: 'steps', slug: 'sedstart' },
}

export const orderedProjects = [0, 1, 3, 4, 2, 5, 6, 7].map(i => profile.projects[i])

export function getPresentation(projectName: string) {
  return Object.entries(projectPresentation).find(([key]) => projectName.startsWith(key))?.[1]
}

export function slugForProject(projectName: string) {
  return getPresentation(projectName)?.slug ?? projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getProjectBySlug(slug: string) {
  return orderedProjects.find(project => slugForProject(project.name) === slug)
}
