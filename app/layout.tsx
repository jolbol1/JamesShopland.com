import '@/css/tailwind.css'

import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { ServerThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrains = localFont({
  src: '../data/fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-code',
  display: 'swap',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ServerThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <html lang="en" className={`${inter.variable} ${jetbrains.variable} `}>
        <head />
        <body className=" flex h-screen flex-col bg-white px-[5vw] py-3 dark:bg-black lg:py-3">
          <Nav />
          <main className="mx-auto mb-auto max-w-8xl grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ServerThemeProvider>
  )
}
