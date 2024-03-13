import Link from "next/link"

import projectsData from "@/data/projectsData"

import ProjectCard from "./project-card"

export function ShowcaseProjects() {
  return (
    <>
      <div className="mx-auto max-w-3xl  px-4 pt-12 sm:px-6 xl:max-w-5xl">
        <div>
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="pb-3 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Showcase Projects
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Here are some of my favourite software engineering projects. These
              projects are prime examples of my diverse skill set and
              experience, demonstrating my ability to use code to solve
              problems, and to have some fun 😊
            </p>
          </div>
          <div className=" py-3">
            <div className="-m-4 flex flex-wrap">
              {projectsData.slice(0, 4).map((d) => (
                <ProjectCard
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  titleLink={d.titleLink}
                  links={d.links}
                  icons={d.icons}
                  className="md relative grow p-4 md:w-1/2 md:grow-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-3xl justify-center px-4  text-base font-medium leading-6 sm:px-6 xl:max-w-5xl">
        <Link
          href="/projects"
          className="my-3 w-full rounded-lg bg-primary-600 p-3 text-center text-white"
          aria-label="All projects"
        >
          View all my projects &rarr;
        </Link>
      </div>
    </>
  )
}
