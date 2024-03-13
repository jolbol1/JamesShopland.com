import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { KBarProvider, Priority, type Action } from "kbar"

import siteMetadata from "@/config/site-metadata"

import { KBarButton } from "./kbar-button"
import { KBarModal as KBarModalType } from "./kbar-modal"

export interface KBarSearchProps {
  searchDocumentsPath: string
  defaultActions?: Action[]
}

let KBarModal: typeof KBarModalType | null = null

export const KBarSearchProvider: FC<{
  children?: ReactNode
  kbarConfig: KBarSearchProps
}> = ({ kbarConfig, children }) => {
  const { searchDocumentsPath, defaultActions } = kbarConfig
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (KBarModal) {
      return Promise.resolve()
    }
    return Promise.all([import("./kbar-modal")]).then(
      ([{ KBarModal: Modal }]) => {
        KBarModal = Modal
      }
    )
  }, [])

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      setLoaded(true)
    })
  }, [importDocSearchModalIfNeeded, setLoaded])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault()
        importDocSearchModalIfNeeded().then(() => {
          setLoaded(true)
          window.removeEventListener("keydown", handleKeyDown)
        })
      }
    }
    if (!loaded) window.addEventListener("keydown", handleKeyDown)
    return () => {
      /*removes event listener on cleanup*/
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [importDocSearchModalIfNeeded, loaded])

  const startingActions: Action[] = Array.isArray(defaultActions)
    ? defaultActions
    : [
        {
          id: "homepage",
          name: "Homepage",
          keywords: "",
          section: "Home",
          perform: () => router.push("/"),
          priority: Priority.HIGH,
        },
        {
          id: "blog",
          name: "Blog",
          keywords: "blog posts content",
          section: "Home",
          perform: () => router.push("/blog"),
          priority: Priority.HIGH,
        },
        {
          id: "youtube",
          name: "YouTube",
          keywords: "youtube channel subscribe",
          section: "Home",
          perform: () =>
            window.open("https://www.youtube.com/@JollyCoding", "_blank"),
          priority: Priority.HIGH,
        },
        {
          id: "projects",
          name: "Projects",
          keywords: "projects portfolio examples demo showcase",
          section: "Home",
          perform: () => router.push("/projects"),
          priority: Priority.HIGH,
        },
        {
          id: "about",
          name: "About",
          keywords: "about who",
          section: "Home",
          perform: () => router.push("/about"),
          priority: Priority.HIGH,
        },
        {
          id: "email",
          name: "Email",
          keywords: "contact email mail",
          section: "Contact",
          perform: () => window.open(`mailto:${siteMetadata.email}`, "_blank"),
          priority: Priority.HIGH,
        },
        {
          id: "linkedin",
          name: "Linkedin",
          keywords: "contact linkedin jobs",
          section: "Contact",
          perform: () => window.open(`${siteMetadata.linkedin}`, "_blank"),
          priority: Priority.HIGH,
        },
        {
          id: "twitter",
          name: "Twitter",
          keywords: "contact twitter tweet",
          section: "Contact",
          perform: () => window.open(`${siteMetadata.twitter}`, "_blank"),
          priority: Priority.HIGH,
        },
        {
          id: "github",
          name: "GitHub",
          keywords: "contact git GitHub projects showcase repo",
          section: "Contact",
          perform: () => window.open(`${siteMetadata.github}`, "_blank"),
          priority: Priority.HIGH,
        },
      ]

  return (
    <>
      <KBarProvider actions={startingActions}>
        <KBarButton loaded={loaded} onOpen={onOpen} />
        {loaded && KBarModal ? (
          <KBarModal searchDocumentsPath={searchDocumentsPath}>
            {children}
          </KBarModal>
        ) : (
          children
        )}
      </KBarProvider>
    </>
  )
}
