// ─── MODULES ─────────────────────────────────────────────────────────────────
import PgRepository from "../../../../base/repository/PgRepository"
import logger from "../../../../common/helpers/logger.helper"
import { IDefaultArgs } from "../../../../common/interfaces/general.interface"
import { ServiceName } from "../../../../common/enums/general.enum"

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
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:list" })
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
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:profile" })
          return reject(err)
        })
    })
  }

  public upsert(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.upsert_query("users", args)
        .exec({ omits: ["password"] })
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:upsertEntity" })
          return reject(err)
        })
    })
  }

  public archive(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
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
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:archiveEntity" })
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
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:restoreEntity" })
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
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:toggle" })
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
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:deleteEntity" })
          return reject(err)
        })
    })
  }

  public getExistUser(args: { email: string; password: string; reseller_id: number }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { email, reseller_id } = args

      let query = "SELECT * FROM users WHERE email = $1 AND is_archive = false AND is_blocked = false"
      const parameters: (string | number)[] = [email]
      if (reseller_id) {
        query += " AND reseller_id = $2"
        parameters.push(reseller_id)
      }
      query += " Limit 1"

      return await this.executeQuery({ query, parameters })
        .then((result) => resolve(result.rows[0]))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.USER, dest: "domains/user/pgLibrary.ts:deleteEntity" })
          return reject(err)
        })
    })
  }
}

export default new UserPgLibrary()
