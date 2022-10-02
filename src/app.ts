import { addMetaData } from "./common/helpers/addMetaData.helper"
import "./bootstrap"
import express, { Request, Response, NextFunction } from "express"
import _ from "lodash"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import config from "config"
import { resolve } from "path"
import { locals, globals } from "./common/variables"
import { ICorsConfig, IHelmetConfig } from "../config/config.interface"
import routesV1 from "./routes/v1"
import rateLimiterMiddleware from "./middlewares/RateLimiterMiddleware"
import multipartMiddleware from "./middlewares/MultipartMiddleware"
import requestMiddleware from "./middlewares/RequestMiddleware"
import authMiddleware from "./middlewares/AuthMiddleware"
import graphqlServer from "./graphql/graphql.server"

const app = express()
const corsConfig: ICorsConfig = config.get("cors")
const helmetConfig: IHelmetConfig = config.get("helmet")
app.locals = locals
_.assign(global, globals)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet(helmetConfig))
app.use(compression())
app.disable("x-powered-by")
app.use(express.static(resolve(process.cwd(), "public")))
app.use(cors(corsConfig))
app.use(rateLimiterMiddleware.check())
app.use(multipartMiddleware.handle)
app.use(requestMiddleware.processIdAdder)
app.use(requestMiddleware.addTokenData)
app.use(requestMiddleware.isMethodAllowed)
app.use(authMiddleware.auth)
app.use("/graphql", graphqlServer)
app.use("/v1", routesV1)
app.use(async (err: any, req: Request, res: Response, next: NextFunction) =>
  addMetaData(req, res, { ...err, errCode: err.errCode ?? 1000 })
)

export default app
