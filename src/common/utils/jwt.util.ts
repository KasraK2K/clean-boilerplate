import { sign, decode, verify, JwtPayload } from "jsonwebtoken"
import logger from "../helpers/logger.helper"
import { ServiceName } from "../enums/general.enum"
import _ from "lodash"

export interface IJwtVerify {
  valid: boolean
  data?: Record<string, any> | undefined
}

class Jwt {
  public payloadToJwt(payload: Record<string, any>): string {
    return sign(payload, String(process.env.JWT_SECRET))
  }

  public jwtToPayload(token: string): string | JwtPayload | null {
    return decode(token)
  }

  public verifyJwt(token: string): IJwtVerify {
    const returnValue: IJwtVerify = { valid: false }

    verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
      if (err) {
        returnValue.valid = false
        logger.warn("Error getting verifyJwt", { service: ServiceName.DEFAULT, dest: "jwt.util" })
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
