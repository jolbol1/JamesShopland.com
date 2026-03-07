import path from "node:path"

import remarkEmbedder, { type TransformerInfo } from "@remark-embedder/core"
import oembedTransformer from "@remark-embedder/transformer-oembed"
import { bundleMDX } from "mdx-bundler"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const ROOT_PATH = process.cwd()

function ensureEsbuildBinaryPath() {
  if (process.env.ESBUILD_BINARY_PATH) return

  process.env.ESBUILD_BINARY_PATH =
    process.platform === "win32"
      ? path.join(ROOT_PATH, "node_modules", "esbuild", "esbuild.exe")
      : path.join(ROOT_PATH, "node_modules", "esbuild", "bin", "esbuild")
}

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

function makeEmbed(html: string, type: string, heightRatio = "56.25%") {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`
}

function matchesHostname(hostname: string, allowedHost: string) {
  return hostname === allowedHost || hostname.endsWith(`.${allowedHost}`)
}

function handleEmbedderHtml(html: string | null, info: TransformerInfo) {
  if (!html) return null

  const url = new URL(info.url)

  if (/youtu\.?be/.test(url.hostname)) {
    return makeEmbed(html, "youtube")
  }

  if (matchesHostname(url.hostname, "codesandbox.io")) {
    return makeEmbed(html, "codesandbox", "80%")
  }

  return html
}

const remarkOembedOptions = {
  handleError: handleEmbedderError,
  handleHTML: handleEmbedderHtml,
  transformers: [oembedTransformer],
}

export async function compileMdx<TFrontmatter extends Record<string, unknown>>(
  filePath: string
) {
  ensureEsbuildBinaryPath()

  return bundleMDX<TFrontmatter>({
    file: filePath,
    cwd: path.dirname(filePath),
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        [remarkEmbedder, remarkOembedOptions],
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      ]

      return options
    },
    esbuildOptions(options) {
      options.alias = {
        ...(options.alias ?? {}),
        "@": ROOT_PATH,
      }
      options.target = ["es2020", "chrome90", "firefox90", "safari15"]

      return options
    },
  })
}
