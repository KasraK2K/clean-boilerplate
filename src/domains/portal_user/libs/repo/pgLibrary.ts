// import { PrismaClient } from "@prisma/client"
import { IDefaultArgs } from "../../../../common/interfaces/general.interface"
import logger from "../../../../common/helpers/logger.helper"
import { ServiceName } from "../../../../common/enums/general.enum"
import PgRepository from "../../../../base/repository/PgRepository"

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
          logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.list" })
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
          logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.profile" })
          return reject(err)
        })
    })
  }

  public upsert(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.upsert_query("portal_users", args)
        .exec()
        .then((result) => resolve(result))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.upsert" })
          return reject(err)
        })
    })
  }

  public archive(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      // return await this.updateOne("portal_users", { id, is_archive: true, archived_at: "NOW()" })
      //   .then(result => resolve(result))
      //   .catch(async (err) => {
      //     logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.archiveUser" })
      //     return reject(err)
      //   })
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
          logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.archive" })
          return reject(err)
        })
    })
  }

  public restore(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      // return await this.updateOne("portal_users", { id, is_archive: false, archived_at: null })
      //   .then(result => resolve(result))
      //   .catch(async (err) => {
      //     logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.restoreUser" })
      //     return reject(err)
      //   })
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
          logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.restore" })
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
          logger.error(err.message, { service: ServiceName.USER, dest: "PortalUserPgLibrary.delete" })
          return reject(err)
        })
    })
  }
}

export default new PortalUserPgLibrary()
