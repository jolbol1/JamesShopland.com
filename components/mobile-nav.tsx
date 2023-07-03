'use client'
import { useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'
import siteMetadata from '@/config/site-metadata'
import { ScrollArea } from './ui/scroll-area'
import headerNavLinks from '@/config/nav-links'
import { GlowDiv } from './glow-div'
import Image from 'next/image'
import Logo from '@/public/images/general/logo.webp'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import * as NavigationMenuRadix from '@radix-ui/react-navigation-menu'

import React from 'react'
import { Menu, X } from 'lucide-react'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  return (
    <div className="[@media(min-width:700px)]:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuRadix.Trigger className="group">
              <div
                className="flex h-[34px] w-[34px] items-center justify-center rounded border  border-gray-800 bg-gray-200 p-1.5 dark:border-gray-200 dark:bg-gray-900"
                aria-label="Toggle Menu"
              >
                <Menu className="group-data-[state='open']:hidden" />
                <X className="hidden group-data-[state='open']:block" />
              </div>
            </NavigationMenuRadix.Trigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] ">
                {headerNavLinks.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-2xl font-semibold leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

export default MobileNav
