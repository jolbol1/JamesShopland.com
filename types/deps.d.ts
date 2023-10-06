declare module "@remark-embedder/core" {
  import { type Plugin } from "unified"
  import {
    type TransformerInfo,
    type RemarkEmbedderOptions,
  } from "@remark-embedder/core"
  declare const remarkEmbedder: Plugin<[RemarkEmbedderOptions]>
  export default remarkEmbedder
  export { type TransformerInfo }
}
