"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

import useIntersectionObserver from "hooks/use-observer"

import siteMetadata from "@/config/site-metadata"

import { GiscusConfig, GiscusProps } from "./giscus"

export type CommentsConfig = GiscusConfig

export interface CommentsProps {
  commentsConfig: CommentsConfig
}

const GiscusComponent = dynamic<GiscusProps>(
  () => {
    return import("./giscus").then((mod) => mod.Giscus)
  },
  { ssr: false }
)

const Comments = () => {
  const [loadComments, setLoadComments] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting
  const commentsConfig = siteMetadata.giscusConfig

  useEffect(() => {
    isVisible && setLoadComments(true)
  }, [isVisible])

  return (
    <div
      className="py-6 text-center text-gray-700 dark:text-gray-300"
      id="comment"
      ref={ref}
    >
      {!loadComments && (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
      {loadComments && <GiscusComponent {...commentsConfig} />}
    </div>
  )
}

export default Comments
