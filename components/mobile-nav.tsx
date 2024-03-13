"use client"

import { useState } from "react"

import headerNavLinks from "@/config/nav-links"

import DarkModeSwitch from "./dark-mode-button"
import Link from "./link"

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto"
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden"
      }
      return !status
    })
  }

  return (
    <div className="[@media(min-width:700px)]:hidden">
      <button
        className=" size-[34px] rounded border border-gray-800 bg-gray-200 p-1.5 dark:border-gray-200 dark:bg-gray-900"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 size-full bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-black ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            className="mr-5 mt-11 size-8 rounded"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          <div key={"home"} className="px-12 py-4">
            <Link
              href={"/"}
              className="text-2xl font-bold  text-gray-900 dark:text-gray-100"
              onClick={onToggleNav}
            >
              {"Home"}
            </Link>
          </div>
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold  text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
          <div className="px-12 py-4">
            <DarkModeSwitch variant="button" />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
