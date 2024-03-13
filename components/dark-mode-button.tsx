"use client"

import { useEffect, useState } from "react"

import clsx from "clsx"
import { useTheme } from "next-themes"

import { GlowDiv } from "./glow-div"

const LightIcon = () => (
  <span
    className="absolute inset-0 top-1 rotate-90 transition  duration-1000 motion-reduce:duration-0 dark:rotate-0"
    style={{ transformOrigin: "50% 100px" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  </span>
)

const DarkIcon = () => (
  <span
    className="absolute inset-0 top-1 rotate-0 transition  duration-1000 motion-reduce:duration-0 dark:-rotate-90"
    style={{ transformOrigin: "50% 100px" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  </span>
)

interface DarkModeSwitchProps {
  variant?: "icon" | "button"
}

const DarkModeSwitch = ({ variant = "icon" }: DarkModeSwitchProps) => {
  const [clientLoaded, setClientLoaded] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setClientLoaded(true), [])

  return (
    <GlowDiv>
      <div className="rounded bg-gray-800 p-px leading-[0]  hover:bg-gradient-to-r  hover:from-blue-600 hover:to-cyan-600 dark:bg-gray-200">
        <button
          onClick={() =>
            setTheme(
              theme === "dark" || resolvedTheme === "dark" ? "light" : "dark"
            )
          }
          className={clsx(
            "mx-auto inline-flex h-8 items-center justify-center overflow-hidden rounded  bg-gray-200 text-gray-800 transition focus:outline-none  dark:bg-gray-800 dark:text-gray-200",
            { "w-8": variant === "icon" }
          )}
        >
          {clientLoaded && (
            <div className="relative size-8">
              <LightIcon />
              <DarkIcon />
            </div>
          )}
          <span
            className={clsx("pr-3 text-sm text-black dark:text-white", {
              "sr-only": variant === "icon",
            })}
          >
            <p>
              Toggle {clientLoaded && theme === "dark" ? "light" : "dark"} mode
            </p>
          </span>
        </button>
      </div>
    </GlowDiv>
  )
}

export default DarkModeSwitch
