import { DevIconTypes } from "@/components/dev-icons"

export interface ProjectData {
  title: string
  description: string
  titleLink: string
  links: { title: string; href: string }[]
  icons?: DevIconTypes[]
}

const projectsData: ProjectData[] = [
  {
    title: "JollyUI",
    description:
      "Styled React Aria components that you can copy and paste into your apps. The components are accessible, customizable, and open source. Over 300 GitHub stars! \n The library includes components like date pickers, sliders, progress bars, meters and more...",
    titleLink: "https://jollyui.dev",
    links: [
      {
        title: "Docs",
        href: "https://jollyui.dev",
      },
      { title: "GitHub", href: "https://github.com/jolbol1/jolly-ui" },
    ],
    icons: ["react", "tailwind", "typescript"],
  },
  {
    title: "F1 GPT",
    description:
      "A OpenAI powered chat application with access to realtime F1 data. You can ask about events of the race, conditions and even transcribe radio messages. Uses Vercel Generative UI to reply with components for a better user experience.",
    titleLink: "https://f1-gpt.vercel.app",
    links: [
      {
        title: "Demo",
        href: "https://f1-gpt.vercel.app",
      },
    ],
    icons: ["next", "react", "typescript"],
  },
  {
    title: "Opening Lines",
    description: `Generate Opening Message tool, which utilizes ChatGPTs API to help you craft the perfect opening message for any situation. Whether you're looking to make a professional introduction or start a conversation on a dating app, this tool can help you get started with the right words and vibe.`,
    titleLink: "https://opening-lines.jamesshopland.cloud/",
    links: [
      { title: "GitHub", href: "https://github.com/jolbol1/opening-lines" },
      { title: "Demo", href: "https://opening-lines.jamesshopland.cloud/" },
    ],
    icons: ["next", "react", "typescript"],
  },

  {
    title: "Random Coordinates",
    description: `Advanced random teleporter for Minecraft with over 100,000 downloads, this popular tool could utilize atmospheric noise to generate random coordinates, providing a more accurate and reliable method than traditional pseudo-random number algorithms commonly used in computer programs.`,
    titleLink: "https://github.com/jolbol1/RandomCoordinatesV2",
    links: [
      { title: "Wiki", href: "https://github.com/jolbol1/RandomCoordinatesV2" },
      {
        title: "Spigot MC",
        href: "https://www.spigotmc.org/resources/randomcoords-rtp-advanced-random-teleporter.1680/",
      },
    ],
    icons: ["java"],
  },
  {
    title: "F1-Calc",
    description: ` F1 Game 2022 AI Difficulty Calculator, a tool designed for Formula 1 racing game enthusiasts. This application allows you to input your best lap times and receive recommendations for the optimal AI level to play at, ensuring a challenging and exciting experience. The included chart provides additional context by showing you the times to beat if you want to push yourself even further. `,
    titleLink: "https://jolbol1.github.io/f1-calc/",
    links: [
      { title: "GitHub", href: "https://github.com/jolbol1/f1-calc" },
      {
        title: "Demo",
        href: "https://jolbol1.github.io/f1-calc/",
      },
    ],
    icons: ["typescript", "svelte"],
  },
  {
    title: "cz-gitmojis",
    description: `Commitizen Adaptor for Gitmoji project, tool that simplifies and standardizes the commit process. This project features is easy-to-use adaptor that follows the popular Gitmoji convention, displaying all available emojis and their descriptions to help developers choose the right emoji to convey the content and status of their commits.`,
    titleLink: "https://www.npmjs.com/package/cz-gitmojis",
    links: [
      { title: "GitHub", href: "https://github.com/jolbol1/cz-gitmojis" },
      { title: "NPM", href: "https://www.npmjs.com/package/cz-gitmojis" },
    ],
    icons: ["javascript", "npm"],
  },
  {
    title: "Plex Bedtime",
    description: `A tool to allow users to kill a plex stream at a particular time. Built as a dashboard add-on for Organizr. The idea was to stop plex playing on when you had fallen asleep, before sites started to add these features themselves.`,
    titleLink: "https://github.com/jolbol1/bedTime",
    links: [{ title: "GitHub", href: "https://github.com/jolbol1/bedTime" }],
    icons: ["python", "php"],
  },
  {
    title: "JamesShopland.com",
    description: `This site! A dynamic website designed to showcase my coding skills and expertise across a range of different frameworks. As I learn and explore new technologies, this project evolves, as I test out frameworks at the forefront of the latest trends in software engineering. Currently on v4, previous versions include: pure HTML, Gatsby React, Svelte Static Site and now Next.JS!`,
    titleLink: "https://github.com/jolbol1/jshopland",
    links: [{ title: "GitHub", href: "https://github.com/jolbol1/jshopland" }],
    icons: ["next", "react", "typescript"],
  },
]

export default projectsData
