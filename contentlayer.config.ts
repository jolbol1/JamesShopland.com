import remarkEmbedder, { type TransformerInfo } from "@remark-embedder/core"
import oembedTransformer from "@remark-embedder/transformer-oembed"
import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer-temp/source-files"
import readingTime from "reading-time"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
// Rehype packages
import rehypeSlug from "rehype-slug"
// Remark packages
import remarkGfm from "remark-gfm"

import siteMetadata from "./config/site-metadata"

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath,
  },
}

const genOgUrl = (title: string) => {
  const ogUrl = new URL(`${siteMetadata.siteUrl}/api/og`)
  ogUrl.searchParams.set("heading", title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")
  return ogUrl.toString()
}

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "list", of: { type: "string" } },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: genOgUrl(doc.title),
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" },
    youtube: { type: "string" },
  },
  computedFields,
}))

const prettyOptions: Options = {
  theme: "github-dark",
  grid: true,
  keepBackground: false,
  onVisitHighlightedLine(node) {
    node.properties.className?.push("line--highlighted")
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word--highlighted"]
  },
}

function handleEmbedderError({ url }: { url: string }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>.`
}

type GottenHTML = string | null
function handleEmbedderHtml(html: GottenHTML, info: TransformerInfo) {
  if (!html) return null

  const url = new URL(info.url)
  // matches youtu.be and youtube.com
  if (/youtu\.?be/.test(url.hostname)) {
    // this allows us to set youtube embeds to 100% width and the
    // height will be relative to that width with a good aspect ratio
    return makeEmbed(html, "youtube")
  }
  if (url.hostname.includes("codesandbox.io")) {
    return makeEmbed(html, "codesandbox", "80%")
  }
  return html
}

function makeEmbed(html: string, type: string, heightRatio = "56.25%") {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`
}

const remarkOembedOptions = {
  handleError: handleEmbedderError,
  handleHTML: handleEmbedderHtml,
  transformers: [oembedTransformer.default],
}

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Authors],
  mdx: {
    remarkPlugins: [remarkGfm, [remarkEmbedder.default, remarkOembedOptions]],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode as any, prettyOptions],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
