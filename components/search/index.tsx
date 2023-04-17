import dynamic from 'next/dynamic'

import type { KBarSearchProps } from './KBar'
import { SearchBarButton } from './SearchBarButton'

export type SearchConfig = KBarSearchProps

export const KBarSearchProvider = dynamic(
  () => {
    return import('./KBar').then((mod) => mod.KBarSearchProvider)
  },
  { ssr: false, loading: () => <SearchBarButton /> }
)
