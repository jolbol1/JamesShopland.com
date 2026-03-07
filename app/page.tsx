import { allCoreContent, getAllBlogs, sortedBlogPost } from "@/lib/mdx"

import { Header } from "@/components/header"
import { LatestPosts } from "@/components/latest-posts"
import { ShowcaseProjects } from "@/components/showcase-projects"

export default async function Home() {
  const sortedPosts = sortedBlogPost(await getAllBlogs())
  const posts = allCoreContent(sortedPosts)

  return (
    <>
      <Header />
      <LatestPosts posts={posts} />
      <ShowcaseProjects />
    </>
  )
}
