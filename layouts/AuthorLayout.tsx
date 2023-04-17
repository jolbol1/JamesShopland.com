import { ReactNode, useEffect, useState } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import AILight from '@/data/images/aiLight.webp'
import AIDark from '@/data/images/aiBlack.webp'
import { useTheme } from 'next-themes'
import { CodingTimeline } from '@/components/CodingTimeline'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content
  const { theme, resolvedTheme } = useTheme()
  const [clientLoaded, setClientLoaded] = useState(false)
  const [aiImage, setAiImage] = useState(null)

  useEffect(() => {
    setClientLoaded(true)
  }, [])

  useEffect(() => {
    if (clientLoaded) {
      if (theme === 'light') {
        setAiImage('dark')
      }
      if (theme === 'dark') {
        setAiImage('light')
      }
      if (resolvedTheme === 'system') {
        if (theme === 'light') {
          setAiImage('dark')
        }
        if (theme === 'dark') {
          setAiImage('light')
        }
      }
    }
  }, [clientLoaded, theme, resolvedTheme, aiImage])

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About me
          </h1>
        </div>
        <div className=" items-start space-y-2 pt-3 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="relative flex flex-col items-center space-x-2 pt-8">
            {aiImage && (
              <Image
                src={aiImage === 'light' ? AILight : AIDark}
                alt={'image made with ai art'}
                width={250}
                height={106}
                className="absolute top-[-6px]"
              />
            )}
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
            <h2 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h2>
            <div className="text-gray-700 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-700 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">
            {children}
            <div className="relative col-span-2 col-start-2 ">
              <h3 className="mb-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900  dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-left  md:leading-14">
                My Coding Journey
              </h3>
              <CodingTimeline />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
