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

function handleEmbedderError({ url }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>.`
}

function handleEmbedderHtml(html, info) {
  if (!html) return null

  const url = new URL(info.url)

  if (/youtu\.?be/.test(url.hostname)) {
    return makeEmbed(html, "youtube")
  }

  if (url.hostname.includes("codesandbox.io")) {
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

const remarkOembedOptions = {
  handleError: handleEmbedderError,
  handleHTML: handleEmbedderHtml,
  transformers: [oembedTransformer.default],
}

export const mdxOptions = {
  remarkPlugins: [remarkGfm, [remarkEmbedder.default, remarkOembedOptions]],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, prettyOptions],
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
}
