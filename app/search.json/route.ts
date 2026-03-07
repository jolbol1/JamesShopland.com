import { getAllBlogs } from "@/lib/content"
import { allCoreContent } from "@/lib/content-types"

export async function GET() {
  const allBlogs = await getAllBlogs()
  const body = JSON.stringify(allCoreContent(allBlogs))

  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
