/* eslint-disable jsx-a11y/anchor-has-content */
import Link, { LinkProps } from 'next/link'

interface CustomLinkProps extends LinkProps {
  href: string
  children?: React.ReactNode
  className?: string
}

const CustomLink = ({ href, ...rest }: CustomLinkProps) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    // @ts-ignore
    return <Link href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
