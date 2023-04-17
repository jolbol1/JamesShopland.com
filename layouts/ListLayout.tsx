import { useState } from 'react'
import { useRouter } from 'next/router'
import { formatDate } from '../utils/formatDate'
import { CoreContent } from '../utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Tags from '@/components/Tags'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  tags: Record<string, number>
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter()
  const basePath = router.pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="relative space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            &larr; Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            &larr; Previous
          </Link>
        )}
        <span className="absolute z-[-1] w-full text-center">
          Page {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next &rarr;
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-primary-400 hover:text-primary-200"
          >
            Next &rarr;
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tags,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className=" divide-y divide-gray-400 dark:divide-gray-700">
        <div className="space-y-2 pb-6 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="pb-3 text-lg leading-7 text-gray-700 dark:text-gray-400 md:pb-0">
            Welcome to my blog, where I share my experiences and insights in the world of
            technology. As a software engineer with a passion for problem-solving and creativity, I
            love exploring new ideas and discovering the latest trends in this rapidly changing
            field. In this blog, I share my thoughts on various topics, from projects I have worked
            on to emerging technologies and industry news. Join me on this exciting journey and stay
            up-to-date with the latest developments in the tech world.
          </p>
          <div className="relative mt-6 h-fit max-w-lg">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 pt-6 ">
          <div className="col-span-12 col-start-1 sm:col-span-8 ">
            <div className="flex-1 rounded-3xl bg-gradient-to-br from-blue-200 to-blue-600 p-[1px] transition duration-300 hover:shadow-2xl hover:shadow-blue-800">
              <ul className="flex h-full flex-col justify-between divide-y divide-gray-400 rounded-3xl bg-slate-200 px-6 dark:divide-gray-700 dark:bg-slate-950">
                {!filteredBlogPosts.length && <p className="py-3">No posts found.</p>}
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
                                  {tags.map((tag) => (
                                    <Tag
                                      key={tag}
                                      text={tag}
                                      className="2xl rounded-lg bg-blue-600  px-2 py-1 text-sm text-white hover:scale-110 hover:bg-blue-600 dark:bg-blue-950 "
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="prose  max-w-none text-gray-600 dark:text-gray-400">
                                {summary}
                              </div>
                            </div>
                            <div className="flex w-full justify-between text-base font-medium leading-6">
                              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>

                              <Link
                                href={`/blog/${slug}`}
                                className="text-primary-700 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-400"
                                aria-label={`Read "${title}"`}
                              >
                                Read more &rarr;
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
          <div className="sm:col-start-0 col-span-12 row-start-2 sm:col-span-8">
            {pagination && pagination.totalPages > 1 && !searchValue && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
          <div className="col-span-12 row-start-3 h-fit divide-y divide-gray-400 rounded-xl bg-gray-200   dark:divide-gray-700  dark:bg-gray-900 sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <div className=" relative h-full rounded-2xl bg-card-gradient-dark p-[1px] dark:bg-card-gradient">
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 p-6 dark:from-slate-950 dark:to-gray-950">
                <h2 className="pb-2  text-2xl font-bold leading-8 tracking-tight">Tags</h2>
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
