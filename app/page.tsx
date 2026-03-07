import { getAllBlogs } from "@/lib/content"
import { allCoreContent, sortedBlogPost } from "@/lib/content-types"

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
