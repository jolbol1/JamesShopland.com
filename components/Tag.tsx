import Link from 'next/link'
import { kebabCase } from '../utils/kebabCase'

export interface TagProps {
  text: string
  className?: string
}

const Tag = ({ text, className }: TagProps) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className={
        className ??
        'mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
      }
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
