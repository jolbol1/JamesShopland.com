import '@/styles/tailwind.css'

import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { ServerThemeProvider } from 'next-themes'
import siteMetadata from '@/config/site-metadata'
import Footer from '@/components/footer'
import Nav from '@/components/nav'
import Analytics from '@/components/analytics'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrains = localFont({
  src: '../public/fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-code',
  display: 'swap',
})

export const metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'James Shopland',
    'Web Developer',
    'Software Engineer',
  ],
  authors: [
    {
      name: 'James Shopland',
      url: 'https://jamesshopland.com.com',
    },
  ],
  creator: 'James Shopland',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}/images/general/og.png`],
    creator: '@jollyshopland',
  },
  icons: {
    icon: '/favicons/favicon.ico',
    shortcut: '/favicons/favicon-16x16.png',
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: `${siteMetadata.siteUrl}/favicons/site.webmanifest`,
}

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
          <Analytics />
        </body>
      </html>
    </ServerThemeProvider>
  )
}
