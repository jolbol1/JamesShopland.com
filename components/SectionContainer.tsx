import { ReactNode } from 'react'

interface Props {
  className?: string
  children: ReactNode
}

export default function SectionContainer({ children, className }: Props) {
  return <section className={className ?? 'px-[5vw] py-3 lg:py-3'}>{children}</section>
}
