import Image from "next/image"
import Link from "next/link"

import hero from "@/public/images/general/hero-image.webp"

export function Header() {
  return (
    <section className="relative ">
      <div className="mx-auto mb-24 grid h-auto max-w-7xl grid-cols-4 gap-x-4 pt-0 md:grid-cols-8 lg:relative lg:mb-64 lg:min-h-[40rem] lg:grid-cols-12 lg:gap-x-6 lg:pb-12 lg:pt-24">
        <div className="col-span-full pt-6 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col">
          <h1 className="typing-demo mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            Hello, I'm James
          </h1>
          <p className="mb-6 max-w-2xl  text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Full-stack Developer With A Passion For Front-End Development and
            Cloud Solutions
          </p>
          <div className="flex w-full">
            <Link
              href="/blog"
              className="mr-3 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              View my blog
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-blue-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              My projects
            </Link>
          </div>
        </div>
        <div className="col-span-full mb-12 flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:-mr-[5vw] lg:-mt-24 lg:mb-0 lg:px-0">
          <div className="relative">
            <Image
              src={hero}
              alt={
                "cartoon image of james shopland with icons of programming languages surrounding him"
              }
              priority
              className="h-auto max-h-[50vh] w-full object-contain lg:max-h-[75vh]"
              sizes="(max-width: 1024px) 60vw,
              100vw"
            />

            <div className="absolute bottom-0 h-12 w-full bg-gradient-to-t from-white to-transparent dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
