import type { Blog } from "contentlayer/generated"

import { formatDate } from "@/lib/utils"

import Link from "@/components/link"
import Tag from "@/components/tag"

const MAX_DISPLAY = 3

type Posts = Omit<Blog, "body" | "_raw" | "_id">[]

interface LatestPostsProps {
  posts: Posts
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <>
      <div className="mx-auto max-w-3xl  px-4 sm:px-6 xl:max-w-5xl ">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="pb-3 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Posts
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            As a software engineer with a passion for problem-solving and
            creativity, I love exploring new ideas and discovering the latest
            trends in this rapidly changing field. In this blog, I share my
            thoughts on various topics, from projects I have worked on to
            emerging technologies and industry news
          </p>
        </div>
        <div className="flex-1 rounded-3xl bg-gradient-to-br from-blue-200 to-blue-600 p-px transition duration-300 hover:shadow-2xl hover:shadow-blue-800">
          <ul className="flex h-full flex-col justify-between divide-y divide-gray-400 rounded-3xl bg-slate-200 px-6 dark:divide-gray-700 dark:bg-slate-950">
            {!posts.length && "No posts found."}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
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
                            className="h-fit text-blue-700 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            {`Read ${
                              post.readingTime.text
                                ? "(" +
                                  post.readingTime.text.replace(" read", "") +
                                  ")"
                                : "more"
                            }`}
                            &rarr;{" "}
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
      <div className="mx-auto mt-6 flex max-w-3xl justify-center px-4 text-base  font-medium leading-6 sm:px-6 xl:max-w-5xl">
        <Link
          href="/blog"
          className="my-3 w-full rounded-lg bg-primary-600 p-3 text-center text-white"
          aria-label="All posts"
        >
          See the full blog &rarr;
        </Link>
      </div>
    </>
  )
}
