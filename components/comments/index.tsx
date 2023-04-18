'use client'
import dynamic from 'next/dynamic'
import { GiscusConfig, GiscusProps } from './giscus'
import siteMetadata from '@/config/site-metadata'
import { useEffect, useRef, useState } from 'react'
import useIntersectionObserver from 'hooks/use-observer'

export type CommentsConfig = GiscusConfig

export interface CommentsProps {
  commentsConfig: CommentsConfig
}

const GiscusComponent = dynamic<GiscusProps>(
  () => {
    return import('./giscus').then((mod) => mod.Giscus)
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
    <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment" ref={ref}>
      {!loadComments && <button onClick={() => setLoadComments(true)}>Load Comments</button>}
      {loadComments && <GiscusComponent {...commentsConfig} />}
    </div>
  )
}

export default Comments
