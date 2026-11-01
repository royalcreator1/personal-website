/** Override only when serving the portfolio on a different public domain. */
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jashu.co.in/')

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString()
}
