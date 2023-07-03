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

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  return (
    <div className="[@media(min-width:700px)]:hidden">
      <Sheet open={navShow} onOpenChange={setNavShow}>
        <SheetTrigger asChild>
          <button
            className=" h-[34px] w-[34px] rounded border border-gray-800 bg-gray-200 p-1.5 dark:border-gray-200 dark:bg-gray-900"
            aria-label="Toggle Menu"
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
        </SheetTrigger>

        <SheetContent>
          <MobileLink href="/" className="flex items-center" onOpenChange={setNavShow}>
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
          </MobileLink>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="mt-3 flex flex-col space-y-6">
              {headerNavLinks?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setNavShow}
                      className="mt-3 text-2xl font-semibold"
                    >
                      {item.title}
                    </MobileLink>
                  )
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export default MobileNav
