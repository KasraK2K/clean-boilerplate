// import { PrismaClient } from "@prisma/client"
import { IDefaultArgs } from "../../../../common/interfaces/general.interface"
import logger from "../../../../common/helpers/logger.helper"
import { ServiceName } from "../../../../common/enums/general.enum"
import PgRepository from "../../../../base/repository/PgRepository"

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
        .then(async (response) => resolve(response))
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
        .then(async (response) => resolve(response))
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
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.upsertEntity" })
          return reject(err)
        })
    })
  }

  public archive(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      // return await this.updateOne("users", { id, is_archive: true, archived_at: "NOW()" })
      //   .then(async (response) => resolve(response))
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
        .then(async (response) => resolve(response.rows))
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
        .then(async (response) => resolve(response.rows))
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
        .then(async (response) => resolve(response.rows))
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
        .then(async (response) => resolve(response.rows))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "UserPgLibrary.deleteEntity" })
          return reject(err)
        })
    })
  }
}

export default new UserPgLibrary()
