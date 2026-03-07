"use client"

import * as React from "react"

import { mdxComponents } from "@/mdx-components"
import { getMDXComponent } from "mdx-bundler/client"

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="mdx">
      <Component components={mdxComponents} />
    </div>
  )
}
