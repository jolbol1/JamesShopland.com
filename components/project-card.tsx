import { ProjectData } from "@/data/projectsData"

import { DevIcon } from "./dev-icons"
import Link from "./link"

interface ProjectCardProps extends ProjectData {
  className?: string
}

const ProjectCard = ({
  title,
  description,
  links,
  titleLink,
  icons,
  className,
}: ProjectCardProps) => (
  <div
    className={className ?? "md relative grow p-4 md:w-1/2 md:grow-0 2xl:w-1/3"}
  >
    <div className=" relative h-full rounded-2xl bg-card-gradient-dark p-px dark:bg-card-gradient">
      <div className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 p-6 dark:from-slate-950 dark:to-gray-950">
        <div className="h-full overflow-hidden rounded-lg ">
          <div className="flex h-full flex-col justify-between ">
            <div>
              <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                {titleLink ? (
                  <Link href={titleLink} aria-label={`Link to ${title}`}>
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </h2>
              <p className=" mb-3 max-w-none text-gray-700 dark:text-gray-400">
                {description}
              </p>
            </div>
            <div className="flex">
              {links &&
                links.map((link, index) => (
                  <div key={`${title}-${link.title}-links`}>
                    {index !== 0 && <span className="px-3">|</span>}
                    <Link
                      key={`${title}-${link.title}`}
                      href={link.href}
                      className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Link to ${link.title}`}
                    >
                      {link.title}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="absolute  bottom-[-16px] right-[-16px] flex flex-row gap-3">
          {icons &&
            icons.map((icon) => {
              return <DevIcon key={icon} width={50} kind={icon} alt={icon} />
            })}
        </div>
      </div>
    </div>
  </div>
)

export default ProjectCard
