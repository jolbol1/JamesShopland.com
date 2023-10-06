import { FC, ReactNode } from "react"

import { Portal } from "./kbar-portal"

export const KBarModal: FC<{
  children: ReactNode
  searchDocumentsPath: string
}> = ({ searchDocumentsPath, children }) => {
  return (
    <>
      <Portal searchDocumentsPath={searchDocumentsPath} />
      {children}
    </>
  )
}
