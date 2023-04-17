// import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from '../components/mdx/MDXComponents'
import { MDXComponents } from '@/components/mdx/MDXComponents'
import ProjectCard from '@/components/ProjectCard'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return { props: { author } }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <MDXLayoutRenderer
        layout={author.layout || DEFAULT_LAYOUT}
        content={author}
        MDXComponents={MDXComponents}
      />

      <div className=" items-start space-y-2 pt-3 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
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
    </>
  )
}
