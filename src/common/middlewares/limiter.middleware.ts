import rateLimit from "express-rate-limit"
import { Request, Response } from "express"
import config from "config"
import { IRateLimiter } from "config/config.interface"
import { addMetaData } from "../helpers/addMetaData.helper"

const reateLimiterConfig: IRateLimiter = config.get("rate_limiter")

export const rateLimiter = () => {
  return rateLimit({
    windowMs: reateLimiterConfig.windowMs, // 1 minutes
    max: reateLimiterConfig.max, // limit each IP to 100 requests per 1 minutes
    standardHeaders: reateLimiterConfig.standardHeaders, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: reateLimiterConfig.legacyHeaders, // Disable the `X-RateLimit-*` headers
    handler: (req: Request, res: Response) => {
      return addMetaData(req, res, { errCode: 1003 })
    },
  })
}
