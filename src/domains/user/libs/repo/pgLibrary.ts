// import { PrismaClient } from "@prisma/client"
import { IDefaultArgs } from "../../../../common/interfaces/general.interface"
import logger from "../../../../common/helpers/logger.helper"
import { ServiceName, TokenType } from "../../../../common/enums/general.enum"
import PgRepository from "../../../../base/repository/PgRepository"
import tokenHelper from "../../../../common/helpers/token.helper"
import bcryptHelper from "../../../../common/helpers/bcrypt.helper"

/**
 * This method using the `PgRepository` builder pattern
 * You can also use this.query to write your own row queries
 */
class UserPgLibrary extends PgRepository {
  public list(args: { id?: number; email?: string } = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select()
        .from("users")
        .where(args)
        .exec()
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.list" })
          return reject(err)
        })
    })
  }

  public profile(id: number): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select()
        .from("users")
        .where([`id = '${id}'`])
        .exec()
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.profile" })
          return reject(err)
        })
    })
  }

  public upsert(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.upsert_query("users", args)
        .exec()
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.upsertEntity" })
          return reject(err)
        })
    })
  }

  public archive(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      // return await this.updateOne("users", { id, is_archive: true, archived_at: "NOW()" })
      //   .then(result => resolve(result))
      //   .catch(async (err) => {
      //     logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.archiveUser" })
      //     return reject(err)
      //   })
      return await this.executeQuery({
        query: `
          UPDATE users
          SET is_archive = $1, archived_at = $2
          WHERE id = $3 AND is_archive = $4
          RETURNING *
        `,
        parameters: [true, "NOW()", id, false],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.archiveEntity" })
          return reject(err)
        })
    })
  }

  public restore(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: `
          UPDATE users
          SET is_archive = $1, archived_at = $2
          WHERE id = $3 AND is_archive = $4
          RETURNING *
        `,
        parameters: [false, null, id, true],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.restoreEntity" })
          return reject(err)
        })
    })
  }

  public toggle(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: `
          UPDATE users
          SET is_blocked = NOT is_blocked
          WHERE id = $1
          RETURNING *
        `,
        parameters: [id],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.toggle" })
          return reject(err)
        })
    })
  }

  public delete(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: "DELETE FROM users WHERE id = $1 RETURNING *",
        parameters: [id],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.deleteEntity" })
          return reject(err)
        })
    })
  }

  public login(args: { email: string; password: string; reseller_id: number }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { email, password, reseller_id } = args

      let query = "SELECT * FROM users WHERE email = $1 AND is_archive = false AND is_blocked = false"
      const parameters: (string | number)[] = [email]
      if (reseller_id) {
        query += " AND reseller_id = $2"
        parameters.push(reseller_id)
      }
      query += " Limit 1"

      const user = await this.executeQuery({
        query,
        parameters,
      })
        .then((result) => result.rows[0])
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.deleteEntity" })
          return ["asd"]
        })

      if (bcryptHelper.compareHash(password, user.password)) return resolve(this.createToken({ id: user.id }))
      else reject({ errCode: 1015 })
    })
  }

  public refreshToken(token: string): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, data } = tokenHelper.verify(token)

      if (!valid) return reject({ errCode: 1010 })
      else if (data.type !== TokenType.TOKEN) return reject({ errCode: 1010 })
      else return resolve(this.createToken({ id: data.id }))
    })
  }

  /* -------------------------------------------------------------------------- */
  private createToken(payload: { id: number }): Record<string, any> {
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

export default new UserPgLibrary()
