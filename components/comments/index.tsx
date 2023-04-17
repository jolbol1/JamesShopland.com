import dynamic from 'next/dynamic'
import { GiscusConfig, GiscusProps } from './Giscus'

export type CommentsConfig = GiscusConfig

export interface CommentsProps {
  commentsConfig: CommentsConfig
}

const GiscusComponent = dynamic<GiscusProps>(
  () => {
    return import('./Giscus').then((mod) => mod.Giscus)
  },
  { ssr: false }
)

export const Comments = ({ commentsConfig }: CommentsProps) => {
  return <GiscusComponent {...commentsConfig} />
}
