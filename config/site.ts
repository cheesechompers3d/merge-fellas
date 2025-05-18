export const siteConfig = {
  name: "Merge Fellas",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.mergefellas.pro", // Replace with actual domain
  description: "A fun and addictive merge game where you combine identical characters to create more powerful ones",
} as const

export type SiteConfig = typeof siteConfig 