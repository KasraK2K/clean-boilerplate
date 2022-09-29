// ─── PACKAGES ────────────────────────────────────────────────────────────────
import { makeExecutableSchema } from "@graphql-tools/schema"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { applyMiddleware } from "graphql-middleware"
import { print } from "graphql"
import { join } from "path"

// ─── MODULES ─────────────────────────────────────────────────────────────────
import resolvers from "./resolvers"
import graphAuthMiddleware from "../../../graphql/middlewares/GraphAuthMiddleware"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"

// ─── MAIN SCHEMA ─────────────────────────────────────────────────────────────
const schema = loadFilesSync(join(__dirname, "./schema.graphql"))
const schemaTypeDefs = mergeTypeDefs(schema)
const printedSchemaTypeDefs = print(schemaTypeDefs)

// ─── GLOBAL SCHEMA ───────────────────────────────────────────────────────────
const globalSchema = loadFilesSync(join(process.cwd(), "src/graphql/global.graphql"))
const globalTypeDefs = mergeTypeDefs(globalSchema)
const printedGlobalTypeDefs = print(globalTypeDefs)

// ─── EXECUTABLE ──────────────────────────────────────────────────────────────
const subschema = makeExecutableSchema({
  typeDefs: [printedGlobalTypeDefs, ...scalarTypeDefs, printedSchemaTypeDefs],
  resolvers,
})

// ─── MIDDLEWARE ──────────────────────────────────────────────────────────────
const authMiddlewares = {
  Query: { user: graphAuthMiddleware.isAuthenticated },
  Mutation: { user: graphAuthMiddleware.isAuthenticated },
}

const schemaWithMiddlewares = applyMiddleware(subschema, authMiddlewares)

export default { schema: schemaWithMiddlewares }
