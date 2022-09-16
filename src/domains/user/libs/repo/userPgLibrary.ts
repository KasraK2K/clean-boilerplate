// import { PrismaClient } from "@prisma/client"
import { IDefaultArgs } from "../../../../common/interfaces/general.interface"
import logger from "../../../../common/helpers/logger.helper"
import { ServiceName } from "../../../../common/enums/general.enum"
import PgRepository from "../../../../base/repository/PgRepository"

class UserPgLibrary extends PgRepository {
  public findMany(args: IDefaultArgs = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await this.select(["id", "email"])
        .from("users")
        .where(["email = '??'"], ["kasra.karami.kk@gmail.com"])
        .exec()
        .then(async (response) => resolve(response))
        .catch(async (err) => {
          logger.error(err.message, { service: ServiceName.USER, dest: "FindUser.findMany" })
          return reject(err)
        })
    })
  }

  public create(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      // const { name, email, posts_title, profile_bio } = args

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
