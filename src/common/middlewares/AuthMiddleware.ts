import { IApplicationConfig } from "config/config.interface"
import { Request, Response, NextFunction } from "express"
import { verify, IConfigs } from "k2token"
import config from "config"
import { addMetaData } from "../helpers/addMetaData.helper"
import Middleware from "./Middleware"

const configs: IConfigs = {
  secret: process.env.K2TOKEN_SECRET ?? "",
  phrase_one: process.env.K2TOKEN_PHRASE_ONE ?? "",
  phrase_two: process.env.K2TOKEN_PHRASE_TWO ?? "",
}

const applicationConfig: IApplicationConfig = config.get("application")

class AuthMiddleware extends Middleware {
  public auth(req: Request, res: Response, next: NextFunction) {
    const endpoint = req.originalUrl
    const apiVersion = applicationConfig.apiVersion
    const ignoreToken: string[] = applicationConfig.request.ignoreToken
    const ignoreApikeys: string[] = applicationConfig.request.ignoreApiKey

    const checkToken = ignoreToken.includes("*")
      ? false
      : !ignoreToken.some((ignoreToken) => endpoint.includes(`/${apiVersion}/${ignoreToken}`))

    const checkApiKey = ignoreApikeys.includes("*")
      ? false
      : !ignoreApikeys.some((ignoreApiKey) => endpoint.includes(`/${apiVersion}/${ignoreApiKey}`))

    /* ------------------------------- Check Token ------------------------------ */
    if (checkToken) {
      let token = req.headers[applicationConfig.bearerHeader] as string
      if (token && token.startsWith(`${applicationConfig.bearer} `)) {
        token = token.slice(applicationConfig.bearer.length + 1)
        const { valid, data } = verify(token, configs)
        if (!valid) return addMetaData(req, res, { errCode: 1010 })
        else req.tokenData = data
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
