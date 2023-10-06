import Image from "next/image"

import FourZeroFour from "@/public/images/general/404.png"

import Link from "@/components/link"

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          priority={true}
          src={FourZeroFour}
          height={320}
          alt={"cartoon james shopland looking confused"}
        />
        <h1 className="mt-6 w-full text-center text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100  md:text-8xl">
          404
        </h1>
        <div className="flex max-w-md flex-col">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            Sorry this page could not be found
          </p>
          <Link
            href="/"
            className="focus:shadow-outline-blue mt-6 inline w-full rounded-lg border border-transparent bg-blue-600 px-4 py-4 text-center text-lg font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </>
  )
}
