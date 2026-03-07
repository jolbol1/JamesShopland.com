import remarkEmbedder from "@remark-embedder/core"
import oembedTransformer from "@remark-embedder/transformer-oembed"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const prettyOptions = {
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

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
])

const CODESANDBOX_HOSTS = new Set([
  "codesandbox.io",
  "www.codesandbox.io",
  "codesandbox.stream",
  "www.codesandbox.stream",
])

function handleEmbedderError({ url }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>.`
}

function handleEmbedderHtml(html, info) {
  if (!html) return null

  const url = new URL(info.url)
  if (YOUTUBE_HOSTS.has(url.hostname)) {
    return makeEmbed(html, "youtube")
  }
  if (CODESANDBOX_HOSTS.has(url.hostname)) {
    return makeEmbed(html, "codesandbox", "80%")
  }

  return html
}

function makeEmbed(html, type, heightRatio = "56.25%") {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`
}

const embedderPlugin = remarkEmbedder.default ?? remarkEmbedder
const oembed = oembedTransformer.default ?? oembedTransformer
const prettyCodePlugin = rehypePrettyCode.default ?? rehypePrettyCode

const remarkOembedOptions = {
  handleError: handleEmbedderError,
  handleHTML: handleEmbedderHtml,
  transformers: [oembed],
}

export const remarkPlugins = [
  remarkGfm,
  [embedderPlugin, remarkOembedOptions],
]

export const rehypePlugins = [
  rehypeSlug,
  [prettyCodePlugin, prettyOptions],
  [
    rehypeAutolinkHeadings,
    {
      properties: {
        className: ["subheading-anchor"],
        ariaLabel: "Link to section",
      },
    },
  ],
]

export const mdxOptions = {
  remarkPlugins,
  rehypePlugins,
}
