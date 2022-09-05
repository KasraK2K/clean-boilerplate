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

class TokenMiddleware extends Middleware {
  public verify(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"]
    if (token && token.startsWith(`${applicationConfig.bearer} `)) {
      token = token.slice(applicationConfig.bearer.length + 1, token.length)
      const { valid } = verify(token, configs)

      if (!valid) return addMetaData(req, res, { errCode: 1010 })
      else next()
    } else addMetaData(req, res, { errCode: 1011 })
  }
}

export default new TokenMiddleware()
