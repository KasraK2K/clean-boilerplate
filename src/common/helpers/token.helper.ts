import { JwtPayload, SignOptions, DecodeOptions } from "jsonwebtoken"
import jwt, { IJwtVerify } from "../utils/jwt.util"
import cypher from "../utils/cypher.util"

class Token {
  public sign(payload: Record<string, any>, options?: SignOptions | undefined): string {
    return cypher.textToCypher(jwt.payloadToJwt(payload, options))
  }

  public decode(cypherToken: string, options?: DecodeOptions | undefined): string | JwtPayload | null {
    return jwt.jwtToPayload(cypher.cypherToText(cypherToken), options)
  }

  public verify(cypherToken: string): IJwtVerify {
    try {
      const jwtToken = cypher.cypherToText(cypherToken)
      return jwt.verifyJwt(jwtToken)
    } catch {
      return { valid: false, data: {} }
    }
  }
}

export default new Token()
