import Link from 'next/link'
import { slug } from 'github-slugger'

export interface TagProps {
  text: string
  className?: string
}

const Tag = ({ text, className }: TagProps) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={
        className ?? 'mr-3 text-sm font-medium uppercase text-primary hover:text-primary-hover '
      }
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
