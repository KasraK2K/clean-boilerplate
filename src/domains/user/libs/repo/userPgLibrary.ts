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
        .exec()
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "FindUser.findMany" })
          return reject(err)
        })
    })
  }

  public getUserProfile(args: { id: string }): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select()
        .from("users")
        .where([`id = '${args.id}'`])
        .exec()
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "FindUser.findMany" })
          return reject(err)
        })
    })
  }

  public addUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await this.insert("users", args)
        .exec()
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "createUser" })
          return reject(err)
        })
    })
  }
}

export default new UserPgLibrary()
