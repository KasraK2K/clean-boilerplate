import Middleware from "./Middleware"
import { Request, Response, NextFunction } from "express"
import config from "config"
import _ from "lodash"
import { IConfig } from "../../../config/config.interface"
import logger from "../helpers/logger.helper"
import { ServiceName } from "../enums/general.enum"
import { addMetaData } from "../helpers/addMetaData.helper"

const configs: IConfig = config.util.toObject()

class RequestMiddleware extends Middleware {
  processIdAdder(req: Request, res: Response, next: NextFunction) {
    const process_id = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16)
    _.assign(global, { process_id })
    _.assign(res.locals, { params: { process_id } })
    next()
  }

  public IsMethodAllowed(req: Request, res: Response, next: NextFunction) {
    const ignoreCheckMethod: string[] = ["swagger"]
    const endpoint = req.originalUrl
    const checkToken = !ignoreCheckMethod.some((ignoreTkn) => endpoint.includes(ignoreTkn))
    const methods = configs.cors.allow_method

    if (!methods.includes(req.method) && checkToken) {
      logger.warn(`Method ${req.method} is not allowed`, { service: ServiceName.DEFAULT, dest: "RequestMiddleware" })
      return addMetaData(req, res, { errCode: 1012 })
    }
    next()
  }
}

export default new RequestMiddleware()
