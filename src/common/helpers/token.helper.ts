import jwt, { IJwtVerify } from "../utils/jwt.util"
import cypher from "../utils/cypher.util"
import { JwtPayload } from "jsonwebtoken"

class Token {
  public sign(payload: Record<string, any>): string {
    return cypher.textToCypher(jwt.payloadToJwt(payload))
  }

  public decode(cypherToken: string): string | JwtPayload | null {
    return jwt.jwtToPayload(cypher.cypherToText(cypherToken))
  }

  public verify(cypherToken: string): IJwtVerify {
    const jwtToken = cypher.cypherToText(cypherToken)
    return jwt.verifyJwt(jwtToken)
  }
}

export default new Token()
