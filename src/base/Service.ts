// ─── PACKAGES ────────────────────────────────────────────────────────────────
import _ from "lodash"

// ─── MODULES ─────────────────────────────────────────────────────────────────
import tokenHelper from "../common/helpers/token.helper"
import { TokenType } from "../common/enums/general.enum"

class Service {
  protected createToken(admin: Record<string, any>): {
    token: string
    expire_token_in: string
    refresh_token: string
    expire_refresh_token_in: string
    admin: Record<string, any>
  } {
    const expire_token_in = "2 days"
    const expire_refresh_token_in = "4 days"

    const token = tokenHelper.sign({ id: admin.id, type: TokenType.TOKEN }, { expiresIn: expire_token_in })
    const refresh_token = tokenHelper.sign(
      { id: admin.id, type: TokenType.REFRESH },
      { expiresIn: expire_refresh_token_in }
    )

    return { token, expire_token_in, refresh_token, expire_refresh_token_in, admin: _.omit(admin, ["password"]) }
  }
}

export default Service
