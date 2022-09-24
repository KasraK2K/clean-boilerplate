import "./bootstrap"
import express from "express"
import _ from "lodash"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import config from "config"
import { resolve } from "path"
import { graphqlHTTP } from "express-graphql"
import { locals, globals } from "./common/variables"
import { IApplicationConfig, ICorsConfig } from "../config/config.interface"
import routesV1 from "./routes/v1"
import rateLimiterMiddleware from "./middlewares/RateLimiterMiddleware"
import multipartMiddleware from "./middlewares/MultipartMiddleware"
import requestMiddleware from "./middlewares/RequestMiddleware"
import authMiddleware from "./middlewares/AuthMiddleware"
import { context } from "./graphql/context"
import executableSchema from "./graphql/register"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"

const app = express()
const corsConfig: ICorsConfig = config.get("cors")
const applicationConfig: IApplicationConfig = config.get("application")
const mode: string = config.get("mode")
app.locals = locals
_.assign(global, globals)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())
app.disable("x-powered-by")
app.use(express.static(resolve(process.cwd(), "public")))
app.use(
  cors({
    optionsSuccessStatus: 200,
    methods: corsConfig.allow_method,
    origin: corsConfig.allow_origin,
  })
)
app.use(rateLimiterMiddleware.check())
app.use(multipartMiddleware.handle)
app.use(requestMiddleware.processIdAdder)
app.use(requestMiddleware.isMethodAllowed)
app.use(authMiddleware.auth)

app.use(
  "/graphql",
  graphqlHTTP(async (request, response, graphQLParams) => ({
    schema: executableSchema,
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
)

app.use("/v1", routesV1)

export default app
