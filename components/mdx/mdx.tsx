import { MDXRemote } from "next-mdx-remote/rsc"

import { mdxComponents } from "@/mdx-components"

import { mdxOptions } from "../../mdx.config.mjs"

interface MdxProps {
  source: string
}

type RemoteOptions = NonNullable<Parameters<typeof MDXRemote>[0]["options"]>

const remoteOptions: RemoteOptions = {
  mdxOptions: mdxOptions as RemoteOptions["mdxOptions"],
}

export async function Mdx({ source }: MdxProps) {
  return (
    <div className="mdx">
      <MDXRemote source={source} components={mdxComponents} options={remoteOptions} />
    </div>
  )
}
