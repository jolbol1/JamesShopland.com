import Link from "next/link"

import { allBlogs } from "contentlayer/generated"
import type { Blog } from "contentlayer/generated"

import { formatDate } from "@/lib/utils"

import Tag from "@/components/tag"
import Tags from "@/components/tags"

import {
  allCoreContent,
  getAllTags,
  sortedBlogPost,
} from "../../lib/contentlayer"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = allCoreContent(sortedBlogPost(allBlogs)) as Blog[]
  const initialDisplayPosts = allCoreContent(posts)
  const tags = await getAllTags(allBlogs)
  const filteredBlogPosts = posts

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts = initialDisplayPosts
  return (
    <>
      <div className="container divide-y divide-gray-400 dark:divide-gray-700">
        <div className="space-y-2 pb-6 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Blog
          </h1>
          <p className="pb-3 text-lg leading-7 text-gray-700 dark:text-gray-400 md:pb-0">
            Welcome to my blog, where I share my experiences and insights in the
            world of technology. As a software engineer with a passion for
            problem-solving and creativity, I love exploring new ideas and
            discovering the latest trends in this rapidly changing field. In
            this blog, I share my thoughts on various topics, from projects I
            have worked on to emerging technologies and industry news. Join me
            on this exciting journey and stay up-to-date with the latest
            developments in the tech world.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3 pt-6 ">
          <div className="col-span-12 col-start-1 sm:col-span-8 ">
            <div className="flex-1 rounded-3xl bg-gradient-to-br from-blue-200 to-blue-600 p-[1px] transition duration-300 hover:shadow-2xl hover:shadow-blue-800">
              <ul className="flex h-full flex-col justify-between divide-y divide-gray-400 rounded-3xl bg-slate-200 px-6 dark:divide-gray-700 dark:bg-slate-950">
                {!filteredBlogPosts.length && (
                  <p className="py-3">No posts found.</p>
                )}
                {displayPosts.map((post) => {
                  const { slug, date, title, summary, tags } = post
                  return (
                    <li key={slug} className="py-6">
                      <article>
                        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                          <div className="space-y-5 xl:col-span-full">
                            <div className="space-y-6">
                              <div>
                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                  <Link
                                    href={`/blog/${slug}`}
                                    className="text-gray-900 dark:text-gray-100"
                                  >
                                    {title}
                                  </Link>
                                </h2>
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {tags &&
                                    tags.map((tag) => (
                                      <Tag
                                        key={tag}
                                        text={tag}
                                        className="2xl rounded-lg bg-blue-600  px-2 py-1 text-sm text-white hover:scale-110 hover:bg-blue-600 dark:bg-blue-950 "
                                      />
                                    ))}
                                </div>
                              </div>
                              <div className="  max-w-none text-gray-600 dark:text-gray-400">
                                {summary}
                              </div>
                            </div>
                            <div className="flex w-full justify-between text-base font-medium leading-6">
                              <time dateTime={date}>{formatDate(date)}</time>

                              <Link
                                href={`/blog/${slug}`}
                                className="text-primary-700 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-400"
                                aria-label={`Read "${title}"`}
                              >
                                {`Read ${
                                  post.readingTime.text
                                    ? "(" +
                                      post.readingTime.text.replace(
                                        " read",
                                        ""
                                      ) +
                                      ")"
                                    : "more"
                                }`}
                                &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="col-span-12 row-start-3 h-fit divide-y divide-gray-400 rounded-xl bg-gray-200   dark:divide-gray-700  dark:bg-gray-900 sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <div className=" relative h-full rounded-2xl bg-card-gradient-dark p-[1px] dark:bg-card-gradient">
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 p-6 dark:from-slate-950 dark:to-gray-950">
                <h2 className="pb-2  text-2xl font-bold leading-8 tracking-tight">
                  Tags
                </h2>
                <div className="pt-2">
                  <Tags tags={tags} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
