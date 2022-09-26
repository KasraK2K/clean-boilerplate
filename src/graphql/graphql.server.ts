import { graphqlHTTP } from "express-graphql"
import config from "config"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"
import { gatewaySchema } from "./gateway"
import { context } from "./context"
import { IApplicationConfig } from "../../config/config.interface"

const applicationConfig: IApplicationConfig = config.get("application")
const mode: string = config.get("mode")

const graphqlServer = graphqlHTTP(async (request, response, graphQLParams) => ({
  schema: gatewaySchema,
  graphiql: { headerEditorEnabled: true },
  context,
  extensions: () => ({
    api_version: applicationConfig.api_version,
    front_version: applicationConfig.front_version,
    portal_vertion: applicationConfig.portal_version,
    env: String(process.env.NODE_ENV),
    mode,
  }),
  pretty: true,
  rootValue: scalarTypeDefs,
}))

export default graphqlServer
