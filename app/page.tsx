import { getAllBlogs, sortBlogsDesc, toAllCoreContent } from "@/lib/content"

import { Header } from "@/components/header"
import { LatestPosts } from "@/components/latest-posts"
import { ShowcaseProjects } from "@/components/showcase-projects"

export default async function Home() {
  const posts = toAllCoreContent(sortBlogsDesc(await getAllBlogs()))

  return (
    <>
      <Header />
      <LatestPosts posts={posts} />
      <ShowcaseProjects />
    </>
  )
}
