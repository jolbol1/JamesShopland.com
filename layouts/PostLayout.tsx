import { useState, ReactNode, useRef, useEffect } from 'react'
import { Comments } from '../components/comments'
import { CoreContent } from '../utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '../components/Link'
import PageTitle from '../components/PageTitle'
import SectionContainer from '../components/SectionContainer'
import { BlogSEO } from '../components/SEO'
import Image from '../components/Image'
import Tag from '../components/Tag'
import siteMetadata from '../data/siteMetadata'
import ScrollTopAndComment from '../components/ScrollTopAndComment'
import localFont from '@next/font/local'
import useIntersectionObserver from 'utils/useIntersectionObserver'

const jetbrains = localFont({
  src: '../data/fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-code',
  display: 'swap',
})

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/master/data/${path}`
const discussUrl = (path) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, date, title, tags } = content
  const basePath = path.split('/')[0]
  const [loadComments, setLoadComments] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    isVisible && setLoadComments(true)
  }, [isVisible])

  return (
    <SectionContainer className={` ${jetbrains.variable}`}>
      <BlogSEO url={`${siteMetadata.siteUrl}/${path}`} authorDetails={authorDetails} {...content} />
      <ScrollTopAndComment />
      <article>
        <div className="">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
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
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
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
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="col-span-8 col-start-3 divide-y divide-gray-200 dark:divide-gray-700  xl:row-span-2 xl:pb-0">
              <div className="f prose max-w-none rounded-xl bg-gray-200 px-6 pb-8 pt-10  text-[19px] dark:prose-dark dark:bg-gray-900">
                {children}
              </div>
              <div className="mt-10 pb-6 pt-6 text-center text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              {siteMetadata.giscusConfig && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                  ref={ref}
                >
                  {!loadComments && (
                    <button onClick={() => setLoadComments(true)}>Load Comments</button>
                  )}
                  {loadComments && <Comments commentsConfig={siteMetadata.giscusConfig} />}
                </div>
              )}
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
                  href={`/${basePath}`}
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
    </SectionContainer>
  )
}
