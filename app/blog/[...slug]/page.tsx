import "@/styles/mdx.css"

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { allAuthors, allBlogs } from "contentlayer/generated"
import type { Blog } from "contentlayer/generated"

import siteMetadata from "@/config/site-metadata"

import { formatDate } from "@/lib/utils"

import Comments from "@/components/comments"
import ScrollTopAndComment from "@/components/floating-buttons"
import { Mdx } from "@/components/mdx/mdx"
import PageTitle from "@/components/page-title"
import Tag from "@/components/tag"

import { coreContent, sortedBlogPost } from "../../../lib/contentlayer"

const editUrl = (path: string) =>
  `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path: string) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${siteMetadata.siteUrl}/${path}`
  )}`

interface BlogPostPageProps {
  params: {
    slug: string[]
  }
}

interface PostPageDetails {
  post: Blog
  prev: ReturnType<typeof coreContent> | null
  next: ReturnType<typeof coreContent> | null
  authorDetails: (ReturnType<typeof coreContent> | null)[]
}

async function getPostFromParams(
  params: BlogPostPageProps["params"]
): Promise<PostPageDetails | null> {
  const slug = params.slug.join("/")
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
  if (postIndex === -1) return null
  const post = sortedPosts[postIndex]
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev =
    (prevContent && (prevContent?.draft ? null : coreContent(prevContent))) ||
    null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next =
    (nextContent && (nextContent?.draft ? null : coreContent(nextContent))) ||
    null

  const authorList = post.authors || ["default"]
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    if (!authorResults) return null
    return coreContent(authorResults)
  })

  return {
    post,
    prev,
    next,
    authorDetails,
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const details = await getPostFromParams(params)

  if (!details || !details.post) {
    return {}
  }

  const post = details.post

  const ogParams = new URLSearchParams()
  ogParams.set("heading", post.title)
  ogParams.set("type", "Blog Post")
  ogParams.set("mode", "dark")

  return {
    title: post.title,
    description: post.summary,
    authors: post.authors?.map((author) => ({
      name: author,
    })),
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [
        {
          url: `/api/og?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`/api/og?${ogParams.toString()}`],
    },
  }
}

export async function generateStaticParams(): Promise<
  BlogPostPageProps["params"][]
> {
  return allBlogs.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const pageDetails = await getPostFromParams(params)
  if (!pageDetails) return notFound()
  const { post, prev, next, authorDetails } = pageDetails
  const { filePath, path, date, title, tags } = post
  const jsonLd = post.structuredData
  jsonLd["author"] = authorDetails.map((author) => {
    return {
      "@type": "Person",
      name: author?.name,
    }
  })

  if (!post || post.draft) {
    notFound()
  }

  return (
    <>
      <article className="container relative">
        <div className="">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr]  xl:grid xl:grid-cols-12 xl:gap-x-6">
            <dl className="col-span-12 flex items-center  justify-center pb-10 pt-10 xl:pt-3">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) =>
                    !author ? null : (
                      <li
                        className="flex items-center space-x-2"
                        key={author.name}
                      >
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">
                            {author.name}
                          </dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter.replace(
                                  "https://twitter.com/",
                                  "@"
                                )}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    )
                  )}
                </ul>
              </dd>
            </dl>
            <div className="col-span-8 col-start-3 divide-y divide-gray-200 dark:divide-gray-700  xl:row-span-2 xl:pb-0">
              <div className="max-w-none rounded-xl bg-gray-200 px-6 py-6  dark:bg-gray-900">
                <Mdx code={post.body.code} />
              </div>
              <div className="mt-10 pb-6 pt-6 text-center text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              <Comments />
            </div>
            <footer className="col-span-2">
              <div className=" text-sm font-medium leading-5  xl:col-start-1 xl:row-start-2 ">
                {tags && (
                  <div className="">
                    <h2 className="pb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="2xl rounded-lg bg-blue-500  px-2 py-1 text-sm text-white hover:scale-110 hover:bg-blue-600 dark:bg-blue-900 "
                        >
                          <Tag key={tag} text={tag} className="lowercase" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between pt-4 xl:block xl:space-y-8 xl:pt-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex h-fit pt-4 xl:pt-8">
                <Link
                  type="button"
                  href={`/blog`}
                  className="w-full rounded-lg  bg-primary-600 p-3 text-center font-bold text-gray-200 hover:scale-110"
                  aria-label="Back to the blogs"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
      <ScrollTopAndComment />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
