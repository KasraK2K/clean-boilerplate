import { IApplicationConfig } from "config/config.interface"
import { Request, Response, NextFunction } from "express"
import config from "config"
import { addMetaData } from "../common/helpers/addMetaData.helper"
import Middleware from "./Middleware"
import tokenHelper from "../common/helpers/token.helper"
import { context } from "../graphql/context"
import _ from "lodash"

const applicationConfig: IApplicationConfig = config.get("application")

class AuthMiddleware extends Middleware {
  public auth(req: Request, res: Response, next: NextFunction) {
    const endpoint = req.originalUrl
    const ignoreToken: string[] = applicationConfig.request.ignoreToken
    const ignoreApikeys: string[] = applicationConfig.request.ignoreApiKey

    const checkToken = ignoreToken.includes("*")
      ? false
      : !ignoreToken.some((ignoreToken) => endpoint.includes(`/${ignoreToken}`))

    const checkApiKey = ignoreApikeys.includes("*")
      ? false
      : !ignoreApikeys.some((ignoreApiKey) => endpoint.includes(`/${ignoreApiKey}`))

    /* ------------------------------- Check Token ------------------------------ */
    if (checkToken) {
      let cypherToken = req.headers[applicationConfig.bearerHeader] as string
      if (cypherToken && cypherToken.startsWith(`${applicationConfig.bearer} `)) {
        cypherToken = cypherToken.slice(applicationConfig.bearer.length + 1)
        const { valid, data } = tokenHelper.verify(cypherToken)
        if (!valid) return addMetaData(req, res, { errCode: 1010 })
        else {
          res.locals.tokenData = _.assign(res.locals.tokenData, data)
          context.tokenData = _.assign(context.tokenData, data)
        }
      } else return addMetaData(req, res, { errCode: 1011 })
    }
    /* -------------------------------------------------------------------------- */

    /* ------------------------------ Check API_KEY ----------------------------- */
    if (checkApiKey) {
      const api_key = req.headers[applicationConfig.apiKeyHeader] as string
      if (!api_key) return addMetaData(req, res, { errCode: 1012 })
      else if (api_key !== process.env.API_KEY) return addMetaData(req, res, { errCode: 1013 })
    }
    /* -------------------------------------------------------------------------- */

    next()
  }
}

export default new AuthMiddleware()
