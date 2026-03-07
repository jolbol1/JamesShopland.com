import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"

import { slug as slugify } from "github-slugger"
import { glob } from "glob"
import matter from "gray-matter"
import readingTime from "reading-time"
import { z } from "zod"

import siteMetadata from "@/config/site-metadata"

import { compileMdx } from "./mdx"
import {
  authorFrontmatterSchema,
  blogFrontmatterSchema,
  type AuthorFrontmatter,
  type BlogFrontmatter,
} from "./schemas"

const DATA_PATH = path.join(process.cwd(), "data")

type ReadingTimeResult = ReturnType<typeof readingTime>

interface StructuredData {
  "@context": "https://schema.org"
  "@type": "BlogPosting"
  headline: string
  datePublished: string
  dateModified: string
  description?: string
  image: string
  url: string
  author?: Array<{
    "@type": "Person"
    name?: string
  }>
}

interface BaseDocument {
  slug: string
  slugAsParams: string
  path: string
  filePath: string
  flattenedPath: string
}

export type BlogMeta = BaseDocument &
  BlogFrontmatter & {
    readingTime: ReadingTimeResult
    structuredData: StructuredData
  }

export type AuthorMeta = BaseDocument & AuthorFrontmatter

export type CompiledMdxDocument<TFrontmatter> = TFrontmatter & {
  code: string
  rawContent: string
}

export type CompiledBlog = CompiledMdxDocument<BlogMeta>
export type CompiledAuthor = CompiledMdxDocument<AuthorMeta>

export type CoreContent<T> = Omit<T, "code" | "rawContent" | "flattenedPath">

function toPosixPath(value: string) {
  return value.split(path.sep).join("/")
}

function getFlattenedPath(filePath: string) {
  return toPosixPath(path.relative(DATA_PATH, filePath)).replace(/\.mdx$/, "")
}

function getBaseDocument(filePath: string): BaseDocument {
  const flattenedPath = getFlattenedPath(filePath)

  return {
    slug: flattenedPath.replace(/^.+?\//, ""),
    slugAsParams: flattenedPath.split("/").slice(1).join("/"),
    path: flattenedPath,
    filePath: toPosixPath(path.relative(DATA_PATH, filePath)),
    flattenedPath,
  }
}

function getBlogStructuredData(blog: BlogFrontmatter, document: BaseDocument) {
  const ogUrl = new URL(`${siteMetadata.siteUrl}/api/og`)
  ogUrl.searchParams.set("heading", blog.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    "@context": "https://schema.org" as const,
    "@type": "BlogPosting" as const,
    headline: blog.title,
    datePublished: blog.date,
    dateModified: blog.lastmod || blog.date,
    description: blog.summary,
    image: ogUrl.toString(),
    url: `${siteMetadata.siteUrl}/${document.path}`,
  }
}

function parseFrontmatter<TSchema extends z.ZodTypeAny>(
  filePath: string,
  schema: TSchema
) {
  return fs.readFile(filePath, "utf8").then((source: string) => {
    const { data, content } = matter(source)
    const parsed = schema.safeParse(data)

    if (!parsed.success) {
      const message = parsed.error.issues
        .map(
          (issue) =>
            `${issue.path.join(".") || "frontmatter"}: ${issue.message}`
        )
        .join("; ")
      throw new Error(`Invalid frontmatter in ${filePath}: ${message}`)
    }

    return {
      frontmatter: parsed.data,
      rawContent: content,
    }
  })
}

async function getCollectionFiles(collection: "blog" | "authors") {
  const files = await glob(`${collection}/**/*.mdx`, {
    cwd: DATA_PATH,
    absolute: true,
  })

  return files.sort((a, b) => a.localeCompare(b))
}

const getBlogFiles = cache(async () => getCollectionFiles("blog"))
const getAuthorFiles = cache(async () => getCollectionFiles("authors"))

const getBlogMetaByFile = cache(async (filePath: string): Promise<BlogMeta> => {
  const { frontmatter, rawContent } = await parseFrontmatter(
    filePath,
    blogFrontmatterSchema
  )
  const document = getBaseDocument(filePath)

  return {
    ...frontmatter,
    ...document,
    readingTime: readingTime(rawContent),
    structuredData: getBlogStructuredData(frontmatter, document),
  }
})

const getAuthorMetaByFile = cache(
  async (filePath: string): Promise<AuthorMeta> => {
    const { frontmatter } = await parseFrontmatter(
      filePath,
      authorFrontmatterSchema
    )

    return {
      ...frontmatter,
      ...getBaseDocument(filePath),
    }
  }
)

export const getAllBlogs = cache(async (): Promise<BlogMeta[]> => {
  const files = await getBlogFiles()
  return Promise.all(files.map((filePath) => getBlogMetaByFile(filePath)))
})

export const getAllAuthors = cache(async (): Promise<AuthorMeta[]> => {
  const files = await getAuthorFiles()
  return Promise.all(files.map((filePath) => getAuthorMetaByFile(filePath)))
})

export function sortBlogsDesc(posts: BlogMeta[]) {
  return [...posts].sort((a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  })
}

export function toCoreContent<T>(document: T): CoreContent<T> {
  const { code, rawContent, flattenedPath, ...rest } = document as T & {
    code?: string
    rawContent?: string
    flattenedPath?: string
  }

  return rest as CoreContent<T>
}

export function toAllCoreContent<T extends { draft?: boolean }>(
  documents: T[]
) {
  return documents
    .filter((document) => document.draft !== true)
    .map((document) => toCoreContent(document))
}

export const getAllTags = cache(async () => {
  const tagCount: Record<string, number> = {}

  for (const post of await getAllBlogs()) {
    if (!post.tags || post.draft === true) continue

    for (const tag of post.tags) {
      const formattedTag = slugify(tag)
      tagCount[formattedTag] = (tagCount[formattedTag] ?? 0) + 1
    }
  }

  return tagCount
})

async function getFileBySlug(slug: string, files: string[]) {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "")

  return (
    files.find(
      (filePath) => getBaseDocument(filePath).slug === normalizedSlug
    ) ?? null
  )
}

export const getBlogBySlug = cache(
  async (slug: string): Promise<CompiledBlog | null> => {
    const filePath = await getFileBySlug(slug, await getBlogFiles())
    if (!filePath) return null

    const meta = await getBlogMetaByFile(filePath)
    const { rawContent } = await parseFrontmatter(
      filePath,
      blogFrontmatterSchema
    )
    const { code } = await compileMdx<BlogFrontmatter>(filePath)

    return {
      ...meta,
      code,
      rawContent,
    }
  }
)

export const getAuthorBySlug = cache(
  async (slug: string): Promise<CompiledAuthor | null> => {
    const filePath = await getFileBySlug(slug, await getAuthorFiles())
    if (!filePath) return null

    const meta = await getAuthorMetaByFile(filePath)
    const { rawContent } = await parseFrontmatter(
      filePath,
      authorFrontmatterSchema
    )
    const { code } = await compileMdx<AuthorFrontmatter>(filePath)

    return {
      ...meta,
      code,
      rawContent,
    }
  }
)

export const getDefaultAuthor = cache(async () => getAuthorBySlug("default"))
