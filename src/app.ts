import express from "express";
import { locals, globals } from "./common/variables";
import _ from "lodash";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import config from "config";
import { ICorsConfig } from "../config/config.interface";
import routesV1 from "./routes/v1";
const app = express();

const corsConfig: ICorsConfig = config.get("cors");

app.locals = locals;
_.assign(global, globals);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.disable("x-powered-by");
app.use(
  cors({
    optionsSuccessStatus: 200,
    methods: corsConfig.allow_method,
    origin: corsConfig.allow_origin,
  })
);

app.use("/v1", routesV1);

export default app;
