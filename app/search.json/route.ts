import { getAllBlogs, toAllCoreContent } from "@/lib/content"

export async function GET() {
  const body = JSON.stringify(toAllCoreContent(await getAllBlogs()))

  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
