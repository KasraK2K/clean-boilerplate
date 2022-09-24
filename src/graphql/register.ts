import path from "path"
import fs from "fs"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge"
import { makeExecutableSchema, mergeSchemas } from "@graphql-tools/schema"
import { print } from "graphql"
import { buildSchema } from "graphql"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"

// ──────────────────────────────────────────────────── Global GraphQL Schema ─────
const globalSchema = loadFilesSync(path.join(process.cwd(), "src/graphql/global.graphql"))
const globalTypeDefs = mergeTypeDefs(globalSchema)
const printedGlobalTypeDefs = print(globalTypeDefs)

// ────────────────────────────────────────────────── Domains Graphql Schemas ─────
const loadedFiles = loadFilesSync(path.join(process.cwd(), "src/domains/**/*.graphql"))
const typeDefs = mergeTypeDefs(loadedFiles)
const printedTypeDefs = print(typeDefs)
fs.writeFileSync(path.join(process.cwd(), "src/graphql/joined.graphql"), printedTypeDefs)

// ──────────────────────────────────────────────── Merge All Graphql Schemas ─────
const mergedSchema = mergeSchemas({
  schemas: [buildSchema(printedGlobalTypeDefs), buildSchema(printedTypeDefs)],
})

// ──────────────────────────────────────────────────────── Domains Resolvers ─────
const resolversArray = loadFilesSync(path.join(process.cwd(), "**/*.resolver.*"), { extensions: ["ts"] })
// const schema = fs.readFileSync(path.join(process.cwd(), "src/graphql/joined.graphql")).toString()

/* ----------------------------------------------------------------------------- */
/*                          Register Executable Schema                           */
/* ----------------------------------------------------------------------------- */
const executableSchema = makeExecutableSchema({
  resolvers: mergeResolvers(resolversArray),
  typeDefs: mergedSchema,
})

export default executableSchema
