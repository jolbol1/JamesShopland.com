import { cn } from "@/lib/utils"

import Facebook from "./facebook.svg"
import Github from "./github.svg"
import Linkedin from "./linkedin.svg"
import Mail from "./mail.svg"
import Rss from "./rss.svg"
import Twitter from "./twitter.svg"
import Youtube from "./youtube.svg"

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  rss: Rss,
}

interface SocialIconProps {
  kind: keyof typeof components
  href: string
  size?: number
  className?: string
}

const SocialIcon = ({ kind, href, size = 8, className }: SocialIconProps) => {
  if (
    !href ||
    (kind === "mail" &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={cn(
          `fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`,
          className
        )}
      />
    </a>
  )
}

export default SocialIcon
