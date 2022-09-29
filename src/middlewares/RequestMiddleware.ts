import Middleware from "./Middleware"
import { Request, Response, NextFunction } from "express"
import config from "config"
import _ from "lodash"
import { IApplicationConfig } from "../../config/config.interface"
import logger from "../common/helpers/logger.helper"
import { ServiceName } from "../common/enums/general.enum"
import { addMetaData } from "../common/helpers/addMetaData.helper"
import tokenHelper from "../common/helpers/token.helper"
import { context } from "../graphql/context"

const applicationConfig: IApplicationConfig = config.get("application")

class RequestMiddleware extends Middleware {
  processIdAdder(req: Request, res: Response, next: NextFunction) {
    const process_id = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16)
    _.assign(global, { process_id })
    _.assign(res.locals, { params: { process_id } })
    next()
  }

  public isMethodAllowed(req: Request, res: Response, next: NextFunction) {
    const endpoint = req.originalUrl
    const allowMethods = applicationConfig.request.allowMethods
    const ignoreCheckMethod: string[] = applicationConfig.request.ignoreCheckMethods
    const checkMethod = !ignoreCheckMethod.some((ignoreEndpoint) => endpoint.includes(`/${ignoreEndpoint}`))

    if (allowMethods.length && !allowMethods.includes("*") && checkMethod && !allowMethods.includes(req.method)) {
      logger.warn(`Method ${req.method} is not allowed`, { service: ServiceName.DEFAULT, dest: "RequestMiddleware.ts" })
      return addMetaData(req, res, { errCode: 1014 })
    }
    next()
  }

  public addTokenData(req: Request, res: Response, next: NextFunction) {
    let cypherToken = req.headers[applicationConfig.bearerHeader] as string
    if (cypherToken && cypherToken.startsWith(`${applicationConfig.bearer} `)) {
      cypherToken = cypherToken.slice(applicationConfig.bearer.length + 1)
      const { valid, data } = tokenHelper.verify(cypherToken)
      if (valid) {
        res.locals.tokenData = _.assign(res.locals.tokenData, data)
        context.tokenData = _.assign(context.tokenData, data)
      } else return addMetaData(req, res, { errCode: 1010 })
    }
    next()
  }
}

export default new RequestMiddleware()
