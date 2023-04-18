import { writeFileSync } from 'fs'
import { allCoreContent } from '../lib/contentlayer'
import siteMetadata from '@/config/site-metadata'

const search = (allBlogs) => {
  writeFileSync(
    `public/${siteMetadata.kbarConfig.searchDocumentsPath}`,
    JSON.stringify(allCoreContent(allBlogs))
  )
  console.log('Local search index generated...')
}
export default search
