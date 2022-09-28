import { TokenType } from "../common/enums/general.enum"
import tokenHelper from "../common/helpers/token.helper"

class Service {
  protected createToken(payload: { id: number }): {
    token: string
    expire_token_in: string
    refresh_token: string
    expire_refresh_token_in: string
  } {
    const expire_token_in = "2 days"
    const expire_refresh_token_in = "4 days"

    const token = tokenHelper.sign({ id: payload.id, type: TokenType.TOKEN }, { expiresIn: expire_token_in })
    const refresh_token = tokenHelper.sign(
      { id: payload.id, type: TokenType.REFRESH },
      { expiresIn: expire_refresh_token_in }
    )
    return { token, expire_token_in, refresh_token, expire_refresh_token_in }
  }
}

export default Service
