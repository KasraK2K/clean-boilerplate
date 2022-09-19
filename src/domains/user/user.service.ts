import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./user.module"
import Service from "../../base/Service"
import userSchema from "./validation/userSchema"
import validator from "../../common/helpers/validator.helper"
import logger from "../../common/helpers/logger.helper"
import { ServiceName } from "../../common/enums/general.enum"

class UserService extends Service {
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) =>
      repository
        .getUserList()
        .then((result) => resolve({ data: result }))
        .catch((err) => reject(err))
    )
  }

  public async getUserProfile(args: { id: string }): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator(args, userSchema.getUser)

      if (!valid) {
        logger.warn(`Validation has error on getUser: ${errors}`, { service: ServiceName.USER, dest: "service" })
        return reject({ errors })
      } else {
        repository
          .getUserProfile(args)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
      }
    })
  }

  public async addUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator(args, userSchema.addUser)

      if (!valid) {
        logger.warn(`Validation has error on addUser: ${errors}`, { service: ServiceName.USER, dest: "service" })
        return reject({ errors })
      } else {
        repository
          .addUser(args)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
      }
    })
  }
}

export default new UserService()
