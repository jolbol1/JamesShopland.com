import { Header } from '@/components/header'
import { LatestPosts } from '@/components/latest-posts'
import { ShowcaseProjects } from '@/components/showcase-projects'
import { Blog, allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortedBlogPost } from '@/lib/contentlayer'

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
