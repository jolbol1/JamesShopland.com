import { allBlogs } from "contentlayer/generated"
import Rss from "rss"

import siteMetadata from "@/config/site-metadata"

import { allCoreContent } from "@/lib/contentlayer"

export async function GET() {
  const feed = new Rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    feed_url: `${siteMetadata.siteUrl}/feed.xml`,
    site_url: siteMetadata.siteUrl,
    webMaster: `${siteMetadata.author} <${siteMetadata.email}>`,
    managingEditor: `${siteMetadata.author} <${siteMetadata.email}>`,
    language: "en-US",
  })

  allCoreContent(allBlogs).forEach((article) => {
    const author = article.authors ? article.authors[0] : siteMetadata.author
    feed.item({
      title: article.title,
      description: article.summary ?? "",
      url: `${siteMetadata.siteUrl}/blog/${article.slug}`,
      guid: `${siteMetadata.siteUrl}/blog/${article.slug}`,
      date: article.date,
      author: `${author} <${siteMetadata.email}>`,
      categories: article.tags ?? [],
    })
  })

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
