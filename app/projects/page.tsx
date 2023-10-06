import projectsData from "@/data/projectsData"

import ProjectCard from "@/components/project-card"

export const metadata = {
  title: "About",
  description: `My projects page, where I showcase some of my software engineering projects. From building web apps with TypeScript and react to developing Java plugins for game, my projects demonstrate my diverse skill set and experience. Explore my work work and get a glimpse into my passion for problem-solving and creativity in the rapidly changing field of technology.`,
}

export default async function Projects() {
  return (
    <div className="container divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Projects
        </h1>
        <p className="text-lg leading-7 text-gray-700 dark:text-gray-400">
          Welcome to my projects page, where I showcase some of my software
          engineering projects. From building web apps with TypeScript and react
          to developing Java plugins for game, my projects demonstrate my
          diverse skill set and experience. Explore my work work and get a
          glimpse into my passion for problem-solving and creativity in the
          rapidly changing field of technology.
        </p>
      </div>
      <div className=" pt-12">
        <div className="-m-4 flex flex-wrap">
          {projectsData.map((d) => (
            <ProjectCard
              key={d.title}
              title={d.title}
              description={d.description}
              titleLink={d.titleLink}
              links={d.links}
              icons={d.icons}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
