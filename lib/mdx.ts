import "server-only"

import fs from "node:fs/promises"
import path from "node:path"

import matter from "gray-matter"
import { slug as slugify } from "github-slugger"
import { cache } from "react"
import readingTime, { type ReadTimeResults } from "reading-time"
import { z } from "zod"

import siteMetadata from "@/config/site-metadata"

const DATA_DIR = path.join(process.cwd(), "data")
const BLOG_DIR = path.join(DATA_DIR, "blog")
const AUTHORS_DIR = path.join(DATA_DIR, "authors")

const dateField = z.preprocess((value) => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }

  return value
}, z.string())

const blogFrontmatterSchema = z.object({
  title: z.string(),
  date: dateField,
  tags: z.array(z.string()).optional(),
  lastmod: dateField.optional(),
  draft: z.boolean().optional(),
  summary: z.string().optional(),
  images: z.array(z.string()).optional(),
  authors: z.array(z.string()).optional(),
  layout: z.string().optional(),
  bibliography: z.string().optional(),
  canonicalUrl: z.string().optional(),
})

const authorFrontmatterSchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
  email: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  layout: z.string().optional(),
  youtube: z.string().optional(),
})

type ReadingTime = ReadTimeResults

interface BaseDocument {
  content: string
  filePath: string
  path: string
  slug: string
  slugAsParams: string
}

export interface BlogDocument extends BaseDocument {
  authors?: string[]
  bibliography?: string
  canonicalUrl?: string
  date: string
  draft?: boolean
  images?: string[]
  lastmod?: string
  layout?: string
  readingTime: ReadingTime
  structuredData: {
    "@context": "https://schema.org"
    "@type": "BlogPosting"
    dateModified: string
    datePublished: string
    description?: string
    headline: string
    image: string
    url: string
  }
  summary?: string
  tags?: string[]
  title: string
}

export interface AuthorDocument extends BaseDocument {
  avatar?: string
  company?: string
  email?: string
  github?: string
  layout?: string
  linkedin?: string
  name: string
  occupation?: string
  twitter?: string
  youtube?: string
}

export type CoreContent<T> = Omit<T, "content">

function toPosixPath(value: string) {
  return value.split(path.sep).join(path.posix.sep)
}

async function getMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return getMdxFiles(fullPath)
      }
      if (entry.isFile() && fullPath.endsWith(".mdx")) {
        return [fullPath]
      }
      return []
    })
  )

  return files.flat().sort()
}

function getFileInfo(fullPath: string, collectionDir: string) {
  const relativeToCollection = path.relative(collectionDir, fullPath)
  const relativeWithoutExtension = relativeToCollection.replace(/\.mdx$/, "")
  const slug = toPosixPath(relativeWithoutExtension)
  const filePath = toPosixPath(path.relative(DATA_DIR, fullPath))
  const collection = path.basename(collectionDir)

  return {
    filePath,
    path: `${collection}/${slug}`,
    slug,
    slugAsParams: slug,
  }
}

function getOgUrl(title: string) {
  const ogUrl = new URL(`${siteMetadata.siteUrl}/api/og`)
  ogUrl.searchParams.set("heading", title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return ogUrl.toString()
}

async function parseBlogDocument(fullPath: string): Promise<BlogDocument> {
  const source = await fs.readFile(fullPath, "utf8")
  const { data, content } = matter(source)
  const frontmatter = blogFrontmatterSchema.parse(data)
  const info = getFileInfo(fullPath, BLOG_DIR)

  return {
    ...frontmatter,
    ...info,
    content,
    readingTime: readingTime(content),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: frontmatter.title,
      datePublished: frontmatter.date,
      dateModified: frontmatter.lastmod || frontmatter.date,
      description: frontmatter.summary,
      image: getOgUrl(frontmatter.title),
      url: `${siteMetadata.siteUrl}/${info.path}`,
    },
  }
}

async function parseAuthorDocument(fullPath: string): Promise<AuthorDocument> {
  const source = await fs.readFile(fullPath, "utf8")
  const { data, content } = matter(source)
  const frontmatter = authorFrontmatterSchema.parse(data)
  const info = getFileInfo(fullPath, AUTHORS_DIR)

  return {
    ...frontmatter,
    ...info,
    content,
  }
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortedBlogPost<T extends { date: string }>(allBlogs: T[]) {
  return [...allBlogs].sort((a, b) => dateSortDesc(a.date, b.date))
}

export const omit = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj)
  keys.forEach((key) => {
    delete result[key]
  })

  return result
}

export function coreContent<T extends BaseDocument>(content: T): CoreContent<T> {
  return omit(content, ["content"])
}

export function allCoreContent<T extends BlogDocument>(contents: T[]) {
  return contents
    .map((content) => coreContent(content))
    .filter((content) => content.draft !== true)
}

export const getAllBlogs = cache(async () => {
  const files = await getMdxFiles(BLOG_DIR)
  return Promise.all(files.map(parseBlogDocument))
})

export const getBlogBySlug = cache(async (slug: string) => {
  const blogs = await getAllBlogs()
  return blogs.find((blog) => blog.slug === slug) ?? null
})

export const getAllAuthors = cache(async () => {
  const files = await getMdxFiles(AUTHORS_DIR)
  return Promise.all(files.map(parseAuthorDocument))
})

export const getAuthorBySlug = cache(async (slug: string) => {
  const authors = await getAllAuthors()
  return authors.find((author) => author.slug === slug) ?? null
})

export async function getAllTags(blogs?: BlogDocument[]) {
  const tagCount: Record<string, number> = {}
  const source = blogs ?? (await getAllBlogs())

  source.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slugify(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}
