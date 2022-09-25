import { makeExecutableSchema } from "@graphql-tools/schema"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { print } from "graphql"
import { join } from "path"
import resolvers from "./resolvers"

const schema = loadFilesSync(join(__dirname, "./schema.graphql"))
const schemaTypeDefs = mergeTypeDefs(schema)
const printedSchemaTypeDefs = print(schemaTypeDefs)

const globalSchema = loadFilesSync(join(process.cwd(), "src/graphql/global.graphql"))
const globalTypeDefs = mergeTypeDefs(globalSchema)
const printedGlobalTypeDefs = print(globalTypeDefs)

const subschema = makeExecutableSchema({
  typeDefs: [printedGlobalTypeDefs, ...scalarTypeDefs, printedSchemaTypeDefs],
  resolvers,
})

export default { schema: subschema }
