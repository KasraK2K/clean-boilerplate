import { Request, Response, NextFunction } from "express"
import config from "config"
import _ from "lodash"
import { IApplicationConfig } from "../../config/config.interface"
import { addMetaData } from "../common/helpers/addMetaData.helper"
import Middleware from "./Middleware"
import tokenHelper from "../common/helpers/token.helper"
import { context } from "../graphql/context"

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
    if (checkToken && !res.locals.tokenData) return addMetaData(req, res, { errCode: 1011 })
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
