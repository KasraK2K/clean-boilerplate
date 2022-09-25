import { stitchSchemas } from "@graphql-tools/stitch"
import { loadFilesSync } from "@graphql-tools/load-files"
import { join } from "path"

const subschemas = loadFilesSync(join(process.cwd(), "/**/*.loader.engine.ts"))

export const gatewaySchema = stitchSchemas({
  subschemas: subschemas,
})
