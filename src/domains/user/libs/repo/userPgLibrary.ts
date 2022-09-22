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
  public getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select()
        .from("users")
        .where(args)
        .exec()
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.getUserList" })
          return reject(err)
        })
    })
  }

  public getUserProfile(id: number): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select()
        .from("users")
        .where([`id = '${id}'`])
        .exec()
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.getUserProfile" })
          return reject(err)
        })
    })
  }

  public upsertUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.upsert("users", args)
        .exec()
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.upsertUser" })
          return reject(err)
        })
    })
  }

  public archiveUser(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      // return await this.updateOne("users", { id, is_archive: true, archived_at: "NOW()" })
      //   .then(async (response) => resolve(response))
      //   .catch(async (err) => {
      //     logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.archiveUser" })
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
          logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.archiveUser" })
          return reject(err)
        })
    })
  }

  public restoreUser(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      // return await this.updateOne("users", { id, is_archive: false, archived_at: null })
      //   .then(async (response) => resolve(response))
      //   .catch(async (err) => {
      //     logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.restoreUser" })
      //     return reject(err)
      //   })
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
          logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.restoreUser" })
          return reject(err)
        })
    })
  }

  public deleteUser(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.executeQuery({
        query: "DELETE FROM users WHERE id = $1 RETURNING *",
        parameters: [id],
        omits: ["password"],
      })
        .then(async (response) => resolve(response.rows))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "userPgLibrary.restoreUser" })
          return reject(err)
        })
    })
  }
}

export default new UserPgLibrary()
