import { Inter } from '@next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Nav from './Nav'
import localFont from '@next/font/local'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const jetbrains = localFont({
  src: '../data/fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-code',
  display: 'swap',
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div
        className={`${inter.className} ${jetbrains.variable} flex h-screen flex-col justify-between font-sans`}
      >
        <Nav />
        <main className="mx-auto mb-auto max-w-8xl">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
