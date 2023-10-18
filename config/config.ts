import type { GiscusConfig } from "../components/comments/giscus"
import type { SearchConfig } from "../components/search"

// Test
export interface CoreConfig {
  title: string
  author: string
  headerTitle: string
  description: string
  language: string
  /** light and dark */
  theme: "system" | "dark" | "light"
  siteUrl: string
  siteRepo: string
  siteLogo: string
  image: string
  socialBanner: string
  email: string
  github: string
  twitter: string
  facebook?: string
  youtube: string
  linkedin: string
  locale: string
}

export type SiteConfig = Record<string, unknown> &
  CoreConfig & {
    kbarConfig: SearchConfig
    giscusConfig: GiscusConfig
  }
