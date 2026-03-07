import "server-only"

import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"

import matter from "gray-matter"
import readingTime from "reading-time"
import { z } from "zod"

import siteMetadata from "@/config/site-metadata"

import type { AuthorDocument, BlogDocument } from "./content-types"

const CONTENT_ROOT = path.join(process.cwd(), "data")
const BLOG_ROOT = path.join(CONTENT_ROOT, "blog")
const AUTHORS_ROOT = path.join(CONTENT_ROOT, "authors")

const blogFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  lastmod: z.string().optional(),
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

async function getMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return getMdxFiles(entryPath)
      }

      return entry.name.endsWith(".mdx") ? [entryPath] : []
    })
  )

  return files.flat()
}

function getDocumentPaths(filePath: string) {
  const relativePath = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, "/")
  const flattenedPath = relativePath.replace(/\.mdx$/, "")

  return {
    slug: flattenedPath.replace(/^.+?\//, ""),
    slugAsParams: flattenedPath.split("/").slice(1).join("/"),
    path: flattenedPath,
    filePath: relativePath,
  }
}

function getStructuredData(
  title: string,
  summary: string | undefined,
  postPath: string,
  date: string,
  lastmod?: string
) {
  const ogUrl = new URL(`${siteMetadata.siteUrl}/api/og`)
  ogUrl.searchParams.set("heading", title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: date,
    dateModified: lastmod || date,
    description: summary,
    image: ogUrl.toString(),
    url: `${siteMetadata.siteUrl}/${postPath}`,
  }
}

async function readBlogDocument(filePath: string): Promise<BlogDocument> {
  const source = await fs.readFile(filePath, "utf8")
  const { content, data } = matter(source)
  const frontmatter = blogFrontmatterSchema.parse(data)
  const paths = getDocumentPaths(filePath)

  return {
    ...frontmatter,
    ...paths,
    body: { raw: content },
    readingTime: readingTime(content),
    structuredData: getStructuredData(
      frontmatter.title,
      frontmatter.summary,
      paths.path,
      frontmatter.date,
      frontmatter.lastmod
    ),
  }
}

async function readAuthorDocument(filePath: string): Promise<AuthorDocument> {
  const source = await fs.readFile(filePath, "utf8")
  const { content, data } = matter(source)
  const frontmatter = authorFrontmatterSchema.parse(data)

  return {
    ...frontmatter,
    ...getDocumentPaths(filePath),
    body: { raw: content },
  }
}

export const getAllBlogs = cache(async () => {
  const files = await getMdxFiles(BLOG_ROOT)
  return Promise.all(files.map((filePath) => readBlogDocument(filePath)))
})

export const getAllAuthors = cache(async () => {
  const files = await getMdxFiles(AUTHORS_ROOT)
  return Promise.all(files.map((filePath) => readAuthorDocument(filePath)))
})
