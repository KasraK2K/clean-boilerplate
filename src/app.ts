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
import { rateLimiter } from "./common/middlewares/limiter.middleware"
import { multipartMiddleware } from "./common/middlewares/multipart.middleware"

const app = express()
const corsConfig: ICorsConfig = config.get("cors")
app.locals = locals
_.assign(global, globals)

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
app.use(rateLimiter())
app.use(multipartMiddleware)

app.use("/v1", routesV1)

export default app
