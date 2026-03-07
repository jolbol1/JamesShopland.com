import { slug } from "github-slugger"
import type { ReadTimeResults } from "reading-time"

export interface ContentBody {
  raw: string
}

export interface ContentDocument {
  slug: string
  slugAsParams: string
  path: string
  filePath: string
  body: ContentBody
}

export interface BlogDocument extends ContentDocument {
  title: string
  date: string
  tags?: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  bibliography?: string
  canonicalUrl?: string
  readingTime: ReadTimeResults
  structuredData: Record<string, unknown>
}

export interface AuthorDocument extends ContentDocument {
  name: string
  avatar?: string
  occupation?: string
  company?: string
  email?: string
  twitter?: string
  linkedin?: string
  github?: string
  layout?: string
  youtube?: string
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortedBlogPost(allBlogs: BlogDocument[]) {
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

export type CoreContent<T> = Omit<T, "body">

export function coreContent<T extends ContentDocument>(content: T) {
  return omit(content, ["body"])
}

export function allCoreContent<T extends ContentDocument>(contents: T[]) {
  return contents
    .map((content) => coreContent(content))
    .filter((content) => !("draft" in content && content.draft === true))
}

export function getAllTags(allBlogs: BlogDocument[]) {
  const tagCount: Record<string, number> = {}

  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
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
