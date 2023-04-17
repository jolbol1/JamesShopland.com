import { Header } from '@/components/Header'
import { LatestPosts } from '@/components/LatestPosts'
import { ShowcaseProjects } from '@/components/ShowcaseProjects'
import { Blog, allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortedBlogPost } from 'utils/contentlayer'

export default async function Home() {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)

  return (
    <>
      <Header />
      <LatestPosts posts={posts} />
      <ShowcaseProjects />
    </>
  )
}
