// @ts-check

import { SiteConfig } from "config/config"

const siteMetadata: SiteConfig = {
  title: "James Shopland",
  author: "James Shopland",
  headerTitle: "James Shopland",
  description:
    "Discover my personal website, where I showcase my coding skills and expertise in software engineering. Explore a range of innovative software tools, blog posts, and project showcases that demonstrate my passion for problem-solving and creativity in the rapidly changing field of technology.",
  language: "en-us",
  theme: "system", // system, dark or light
  siteUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://jamesshopland.com",
  siteRepo: "https://github.com/jolbol1/JamesShopland.com",
  siteLogo: "/static/images/logo.png",
  image: "/static/images/avatar.png",
  socialBanner: "/static/images/twitter-card.png",
  email: "hello@jamesshopland.com",
  github: "https://github.com/jolbol1",
  twitter: "https://twitter.com/JollyShopland",
  facebook: "https://facebook.com",
  youtube: "https://www.youtube.com/@JollyCoding",
  linkedin: "https://www.linkedin.com/in/james-shopland",
  locale: "en-GB",
  giscusConfig: {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "",
    repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID ?? "",
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "",
    mapping: "pathname",
    reactions: "1",
    metadata: "0",
    theme: "light",
    darkTheme: "transparent_dark",
    themeURL: "",
    lang: "en",
  },
  kbarConfig: {
    searchDocumentsPath: "search.json",
  },
}

export default siteMetadata
