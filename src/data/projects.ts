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
  'NBX - SALES TOOL': { title: 'NBX - SALES TOOL', category: 'Pharmaceuticals / Sales intelligence', summary: 'NBX means Next Best Experience — a multipage sales tool for Vertex Pharmaceuticals, connecting data, workflows, and deployment.', motif: 'bars', slug: 'sales-tool-vertex-pharmaceuticals-boston' },
  'SYNERGY MARINE': { title: 'SYNERGY MARINE', category: 'Maritime / Communication', summary: 'Supporting ship-to-shore communication with WebRTC calling and adaptive video quality.', motif: 'mesh', slug: 'synergy-marine' },
  'ZIVIAN HEALTH': { title: 'ZIVIAN HEALTH', category: 'Healthcare / Backend', summary: 'Backend APIs and integrations for payments, provider verification, and secure authentication.', motif: 'pulse', slug: 'zivian-health' },
}

export const orderedProjects = [0, 1, 3, 4, 2, 5, 6].map(i => profile.projects[i])

export function getPresentation(projectName: string) {
  return Object.entries(projectPresentation).find(([key]) => projectName.startsWith(key))?.[1]
}

export function slugForProject(projectName: string) {
  return getPresentation(projectName)?.slug ?? projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getProjectBySlug(slug: string) {
  return orderedProjects.find(project => slugForProject(project.name) === slug)
}
