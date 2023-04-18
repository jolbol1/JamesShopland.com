// import { MDXLayoutRenderer } from '@/components/MDXComponents'

import ImageSwitcher from '@/components/ImageSwitcher'
import { allAuthors } from 'contentlayer/generated'
import AILight from '@/data/images/aiLight.webp'
import AIDark from '@/data/images/aiBlack.webp'
import { CodingTimeline } from '@/components/CodingTimeline'
import SocialIcon from '@/components/social-icons'
import Image from 'next/image'
import ProjectCard from '@/components/ProjectCard'
import { Mdx } from '@/components/mdx/mdx'

export default function About() {
  const author = allAuthors.find((p) => p.slug === 'default')
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = author

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About me
        </h1>
      </div>
      <div className=" items-start space-y-2 pt-3 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="relative flex flex-col items-center space-x-2 pt-8">
          <ImageSwitcher
            light={AIDark}
            dark={AILight}
            alt={'image made with ai art'}
            width={250}
            height={106}
            className="absolute top-[-6px]"
          />

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
        <div className="dark:prose-dark prose max-w-none pb-8 pt-8 xl:col-span-2">
          <Mdx code={author.body.code} />

          <div className="relative col-span-2 col-start-2 ">
            <h3 className="mb-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900  dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-left  md:leading-14">
              My Coding Journey
            </h3>
            <CodingTimeline />
          </div>
        </div>
        <div className="col-span-full items-start space-y-2 pt-3 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <h3 className="col-span-2 col-start-2 mb-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-left md:leading-14">
            Professional Certificates
          </h3>
          <ProjectCard
            title={'AZ-204: Developing Solutions for Microsoft Azure'}
            description="From requirements definition and design to development, deployment, and maintenance. Use cloud DBAs, cloud administrators, and clients to implement solutions."
            links={[
              {
                title: 'View Exam Details',
                href: 'https://learn.microsoft.com/en-us/certifications/exams/az-204/',
              },
            ]}
            titleLink={'https://learn.microsoft.com/en-us/certifications/exams/az-204/'}
            icons={['azure']}
            className=" md relative col-span-2 col-start-2 w-full grow xl:w-1/2 "
          />
        </div>
      </div>
    </div>
  )
}
