import { Context } from "./../../../graphql/context"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { applyMiddleware } from "graphql-middleware"
import { print } from "graphql"
import { join } from "path"
import resolvers from "./resolvers"
import error from "../../../common/helpers/error.helper"
import graphAuthMiddleware from "../../../graphql/middlewares/GraphAuthMiddleware"

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

const authMiddlewares = {
  Query: {
    user: graphAuthMiddleware.isAuthenticated,
  },
  Mutation: {
    user: graphAuthMiddleware.isAuthenticated,
  },
}

const schemaWithMiddlewares = applyMiddleware(subschema, authMiddlewares)

export default { schema: schemaWithMiddlewares }
