// ─── MODULES ─────────────────────────────────────────────────────────────────
import PgRepository from "../../../../base/repository/PgRepository"
import logger from "../../../../common/helpers/logger.helper"
import { IDefaultArgs } from "../../../../common/interfaces/general.interface"
import { ServiceName } from "../../../../common/enums/general.enum"

/**
 * This method using the `PgRepository` builder pattern
 * You can also use this.query to write your own row queries
 */
class PortalUserPgLibrary extends PgRepository {
  public list(args: { id?: number; email?: string } = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select()
        .from("portal_users")
        .where(args)
        .exec()
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:list" })
          return reject(err)
        })
    })
  }

  public profile(id: number): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select()
        .from("portal_users")
        .where([`id = '${id}'`])
        .exec()
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:profile" })
          return reject(err)
        })
    })
  }

  public upsert(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.upsert_query("portal_users", args)
        .exec({ omits: ["password"] })
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:upsert" })
          return reject(err)
        })
    })
  }

  public archive(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: `
          UPDATE portal_users
          SET is_archive = $1, archived_at = $2
          WHERE id = $3 AND is_archive = $4
          RETURNING *
        `,
        parameters: [true, "NOW()", id, false],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:archive" })
          return reject(err)
        })
    })
  }

  public restore(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: `
          UPDATE portal_users
          SET is_archive = $1, archived_at = $2
          WHERE id = $3 AND is_archive = $4
          RETURNING *
        `,
        parameters: [false, null, id, true],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:restore" })
          return reject(err)
        })
    })
  }

  public toggle(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: `
          UPDATE portal_users
          SET is_admin = NOT is_admin
          WHERE id = $1
          RETURNING *
        `,
        parameters: [id],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:toggle" })
          return reject(err)
        })
    })
  }

  public delete(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: "DELETE FROM portal_users WHERE id = $1 RETURNING *",
        parameters: [id],
        omits: ["password"],
      })
        .then((result) => resolve(result.rows))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:delete" })
          return reject(err)
        })
    })
  }

  public getExistPortalUser(args: {
    email: string
    password: string
    reseller_id: number
  }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { email, reseller_id } = args

      let query = "SELECT * FROM portal_users WHERE email = $1 AND is_archive = false"
      const parameters: (string | number)[] = [email]
      if (reseller_id) {
        query += " AND reseller_id = $2"
        parameters.push(reseller_id)
      }
      query += " Limit 1"

      return await this.executeQuery({ query, parameters })
        .then((result) => resolve(result.rows[0]))
        .catch(async (err) => {
          logger.error(err, { service: ServiceName.PORTAL_USER, dest: "domains/portal_user/pgLibrary.ts:deleteEntity" })
          return reject(err)
        })
    })
  }
}

export default new PortalUserPgLibrary()
