'use client'
import siteMetadata from '@/config/site-metadata'
import headerNavLinks from '@/config/nav-links'
import Logo from '@/public/images/general/logo.webp'
import Link from './link'
import MobileNav from './mobile-nav'
import DarkModeSwitch from './dark-mode-button'
import Image from 'next/image'
import { GlowDiv } from './glow-div'
import KBarSearchProvider from './search'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { cn } from '@/lib/utils'

const Nav = () => {
  return (
    <nav className="mx-auto flex w-full max-w-8xl items-center justify-between pb-10 pt-[3.25rem]">
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
          <NavigationMenu>
            <NavigationMenuList>
              {headerNavLinks.map((link) => (
                <NavigationMenuItem key={link.href} className="text-base">
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), ' text-base')}>
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <KBarSearchProvider kbarConfig={siteMetadata.kbarConfig} />
        <div className="ml-0 hidden min-[700px]:block [@media(min-width:810px)]:mr-4">
          <DarkModeSwitch />
        </div>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Nav
