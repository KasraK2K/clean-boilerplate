import "./bootstrap"
import express from "express"
import _ from "lodash"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import config from "config"
import { resolve } from "path"
import { locals, globals } from "./common/variables"
import { ICorsConfig } from "../config/config.interface"
import routesV1 from "./routes/v1"
import rateLimiterMiddleware from "./common/middlewares/RateLimiterMiddleware"
import multipartMiddleware from "./common/middlewares/MultipartMiddleware"
import requestMiddleware from "./common/middlewares/RequestMiddleware"
import authMiddleware from "./common/middlewares/AuthMiddleware"

/* -------------------------------------------------------------------------- */
/*                                   GraphQL                                  */
/* -------------------------------------------------------------------------- */
import { graphqlHTTP } from "express-graphql"
import { context } from "./graphql/context"
import { mergeSchemas } from "@graphql-tools/schema"
import { schema as UserSchema } from "./domains/user/graphql/schema"
/* -------------------------------------------------------------------------- */

const app = express()
const corsConfig: ICorsConfig = config.get("cors")
app.locals = locals
_.assign(global, globals)

/* -------------------------------------------------------------------------- */
/*                                   GraphQL                                  */
/* -------------------------------------------------------------------------- */
const mergedSchema = mergeSchemas({
  schemas: [UserSchema],
})
app.use(
  "/graphql",
  graphqlHTTP({
    schema: mergedSchema,
    graphiql: true,
    context,
  })
)
/* -------------------------------------------------------------------------- */

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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
app.use(requestMiddleware.IsMethodAllowed)
app.use(authMiddleware.auth)

app.use("/v1", routesV1)

export default app
