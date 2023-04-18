import Link from 'next/link'

export interface TagProps {
  text: string
  className?: string
}

const Tag = ({ text, className }: TagProps) => {
  return (
    <Link
      href={`/tags/${text}`}
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
