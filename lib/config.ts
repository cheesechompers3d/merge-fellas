import type { SiteConfig } from './types'

// 默认配置
export const defaultConfig: SiteConfig = {
  defaultGame: "merge-fellas",
  siteName: "Merge Fellas",
  seo: {
    title: "Merge Fellas - Play Free Online Meme Clicker Game",
    description: "Play Merge Fellas, a fun meme-based clicker game where you merge cute characters to create powerful combinations. Compete with friends and discover rare items!",
    ogImage: "/images/hot_game/merge-fellas.jpg",
    keywords: "merge fellas, online merge game, meme clicker, idle merge, character collection, free browser game"
  },
  advertisement: {
    key: ""
  },
  siteInfo: {
    companyName: "Merge Fellas",
    siteUrl: "https://www.mergefellas.pro",
    email: "HarryC199101@gmail.com"
  },
  footer: {
    columns: [
      {
        title: "Games",
        description: "",
        links: [
          {
            text: "More Games",
            url: "/more-games"
          }
        ]
      }
    ],
    copyright: "© 2025 All rights reserved.",
    disclaimer: "This is an independent website and is not affiliated with any organizations."
  }
} 

export function getSiteConfig(): SiteConfig {
  return defaultConfig
} 