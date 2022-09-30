// ─── PACKAGES ────────────────────────────────────────────────────────────────
import _ from "lodash"

// ─── MODULES ─────────────────────────────────────────────────────────────────
import tokenHelper from "../common/helpers/token.helper"
import { TokenType } from "../common/enums/general.enum"

class Service {
  protected createToken(entity: Record<string, any>): {
    token: string
    expire_token_in: string
    refresh_token: string
    expire_refresh_token_in: string
    entity: Record<string, any>
  } {
    const expire_token_in = "2 days"
    const expire_refresh_token_in = "4 days"

    const token = tokenHelper.sign({ id: entity.id, type: TokenType.TOKEN }, { expiresIn: expire_token_in })
    const refresh_token = tokenHelper.sign(
      { id: entity.id, type: TokenType.REFRESH },
      { expiresIn: expire_refresh_token_in }
    )

    return { token, expire_token_in, refresh_token, expire_refresh_token_in, entity: _.omit(entity, ["password"]) }
  }
}

export default Service
