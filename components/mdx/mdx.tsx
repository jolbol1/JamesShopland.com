import { compileMDX } from "next-mdx-remote/rsc"

import { mdxOptions } from "@/lib/mdx-options.mjs"

import { mdxComponents } from "./components"

type CompileMdxOptions = NonNullable<
  NonNullable<Parameters<typeof compileMDX>[0]["options"]>["mdxOptions"]
>

interface MdxProps {
  source: string
}

export async function Mdx({ source }: MdxProps) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: mdxOptions as CompileMdxOptions,
    },
    components: mdxComponents,
  })

  return <div className="mdx">{content}</div>
}
