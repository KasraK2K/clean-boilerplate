import { stitchSchemas } from "@graphql-tools/stitch"
import { loadFilesSync } from "@graphql-tools/load-files"
import { loadSchemaSync } from "@graphql-tools/load"
import { UrlLoader } from "@graphql-tools/url-loader"
import { join } from "path"

const subschemas = loadFilesSync(join(process.cwd(), "/**/*.loader.engine.ts"))

// ─────────────────────────────────────────────────────────────────────────────────────
//   :::::: NOTE: Microservice External Schema : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────────────────────────────────
const microserviceExternalSchema = loadSchemaSync("https://api.spacex.land/graphql/", {
  loaders: [new UrlLoader()],
})
subschemas.push(microserviceExternalSchema)
// ─────────────────────────────────────────────────────────────────────────────────────

export const gatewaySchema = stitchSchemas({
  subschemas: subschemas,
})
