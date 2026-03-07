import { allCoreContent, getAllBlogs } from "@/lib/mdx"

export const dynamic = "force-static"

export async function GET() {
  const allBlogs = await getAllBlogs()
  const body = JSON.stringify(allCoreContent(allBlogs))

  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
