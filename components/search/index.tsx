"use client"

import dynamic from "next/dynamic"

import type { KBarSearchProps } from "./kbar"
import { SearchBarButton } from "./search-bar-button"

export type SearchConfig = KBarSearchProps

const KBarSearchProvider = dynamic(
  () => {
    return import("./kbar").then((mod) => mod.KBarSearchProvider)
  },
  { ssr: false, loading: () => <SearchBarButton /> }
)

export default KBarSearchProvider
