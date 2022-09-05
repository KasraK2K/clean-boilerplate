import Middleware from "./Middleware"
import { Request, Response, NextFunction } from "express"
import config from "config"
import _ from "lodash"
import { IApplicationConfig } from "../../../config/config.interface"
import logger from "../helpers/logger.helper"
import { ServiceName } from "../enums/general.enum"
import { addMetaData } from "../helpers/addMetaData.helper"

const applicationConfig: IApplicationConfig = config.get("application")

class RequestMiddleware extends Middleware {
  processIdAdder(req: Request, res: Response, next: NextFunction) {
    const process_id = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16)
    _.assign(global, { process_id })
    _.assign(res.locals, { params: { process_id } })
    next()
  }

  public IsMethodAllowed(req: Request, res: Response, next: NextFunction) {
    const endpoint = req.originalUrl
    const apiVersion = applicationConfig.apiVersion
    const allowMethods = applicationConfig.request.allow_methods
    const ignoreCheckMethod: string[] = applicationConfig.request.ignore_check_methods
    const checkMethod = !ignoreCheckMethod.some((ignoreEndpoint) =>
      endpoint.includes(`/${apiVersion}/${ignoreEndpoint}`)
    )

    if (allowMethods.length && !allowMethods.includes("*") && checkMethod && !allowMethods.includes(req.method)) {
      logger.warn(`Method ${req.method} is not allowed`, { service: ServiceName.DEFAULT, dest: "RequestMiddleware" })
      return addMetaData(req, res, { errCode: 1014 })
    }
    next()
  }
}

export default new RequestMiddleware()
