import { sign, decode, verify, JwtPayload, SignOptions, DecodeOptions } from "jsonwebtoken"
import logger from "../helpers/logger.helper"
import { ServiceName } from "../enums/general.enum"
import _ from "lodash"

export interface IJwtVerify {
  valid: boolean
  data: Record<string, any>
}

class Jwt {
  public payloadToJwt(payload: Record<string, any>, options?: SignOptions | undefined): string {
    return sign(payload, String(process.env.JWT_SECRET), options)
  }

  public jwtToPayload(token: string, options?: DecodeOptions | undefined): string | JwtPayload | null {
    return decode(token, options)
  }

  public verifyJwt(token: string): IJwtVerify {
    const returnValue: IJwtVerify = { valid: false, data: {} }

    verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
      if (err) {
        returnValue.valid = false
        logger.warn(err.message, { service: ServiceName.DEFAULT, dest: "jwt.util.ts" })
      } else {
        returnValue.valid = true
        returnValue.data = {}
        typeof decoded === "object" && _.keys(decoded).length && _.assign(returnValue.data, decoded)
      }
    })

    return returnValue
  }
}

export default new Jwt()
