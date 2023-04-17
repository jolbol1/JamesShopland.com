import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/images/logo.webp'
import Link from '../Link'
import DarkModeSwitch from '../DarkModeSwitch'
import Image from 'next/image'
import { GlowDiv } from '../GlowDiv'

const Nav = () => {
  return (
    <nav className="mx-auto flex w-full max-w-8xl items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between align-middle">
            <div className="mr-3">
              <GlowDiv>
                <Image src={Logo} height={48} width={48} alt="James Shopland Logo" />
              </GlowDiv>
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="underlined after:bottom[0px]  text-xl font-semibold   [@media(min-width:440px)]:text-2xl">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden items-center justify-center min-[700px]:flex">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="underlined m-1 rounded-sm  font-medium  text-gray-900 decoration-2  hover:bg-gray-200 hover:underline hover:outline hover:outline-8 hover:outline-gray-200 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:outline-gray-800  sm:m-4"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="ml-0 hidden min-[700px]:block [@media(min-width:810px)]:mr-4">
          <DarkModeSwitch />
        </div>
      </div>
    </nav>
  )
}

export default Nav
