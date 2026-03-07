import { z } from "zod"

const optionalDateString = z
  .union([z.string(), z.date()])
  .optional()
  .transform((value) => {
    if (!value) return undefined
    return typeof value === "string" ? value : value.toISOString()
  })

const optionalString = z.string().optional()

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  date: z
    .union([z.string(), z.date()])
    .transform((value) =>
      typeof value === "string" ? value : value.toISOString()
    ),
  tags: z.array(z.string()).optional(),
  lastmod: optionalDateString,
  draft: z.boolean().optional(),
  summary: optionalString,
  images: z.array(z.string()).optional(),
  authors: z.array(z.string()).optional(),
  layout: optionalString,
  bibliography: optionalString,
  canonicalUrl: optionalString,
})

export const authorFrontmatterSchema = z.object({
  name: z.string(),
  avatar: optionalString,
  occupation: optionalString,
  company: optionalString,
  email: optionalString,
  twitter: optionalString,
  linkedin: optionalString,
  github: optionalString,
  layout: optionalString,
  youtube: optionalString,
})

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>
export type AuthorFrontmatter = z.infer<typeof authorFrontmatterSchema>
