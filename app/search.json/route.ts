import { allBlogs } from "contentlayer/generated"

import { allCoreContent } from "@/lib/contentlayer"

export async function GET() {
  const body = JSON.stringify(allCoreContent(allBlogs))

  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
