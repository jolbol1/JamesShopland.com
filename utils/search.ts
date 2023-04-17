import { writeFileSync } from 'fs'
import { allCoreContent } from './contentlayer'
import siteMetadata from '../data/siteMetadata'

const search = (allBlogs) => {
  writeFileSync(
    `public/${siteMetadata.kbarConfig.searchDocumentsPath}`,
    JSON.stringify(allCoreContent(allBlogs))
  )
  console.log('Local search index generated...')
}
export default search
