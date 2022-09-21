import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./user.module"
import Service from "../../base/Service"
import userSchema from "./validation/userSchema"
import validator from "../../common/helpers/validator.helper"
import logger from "../../common/helpers/logger.helper"
import { ServiceName } from "../../common/enums/general.enum"

class UserService extends Service {
  /**
   * This method get args to filter users but in this time args is empty
   */
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) =>
      repository
        .getUserList(args)
        .then((result) => resolve({ data: result }))
        .catch((err) => reject(err))
    )
  }

  public async getUserProfile(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, userSchema.getOne)

      if (!valid) {
        logger.warn(`Validation has error on getUser: ${errors}`, { service: ServiceName.USER, dest: "service" })
        return reject({ errors })
      } else {
        repository
          .getUserProfile(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
      }
    })
  }

  public async upsertUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { id } = args
      let valid: boolean
      let errors: string[]

      if (id) {
        const upsertValidation = validator(args, userSchema.upsert)
        valid = upsertValidation.valid
        errors = upsertValidation.errors
      } else {
        const createValidation = validator(args, userSchema.create)
        valid = createValidation.valid
        errors = createValidation.errors
      }

      if (!valid) {
        logger.warn(`Validation has error on addUser: ${errors}`, { service: ServiceName.USER, dest: "service" })
        return reject({ errors })
      } else {
        repository
          .upsertUser(args)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
      }
    })
  }
}

export default new UserService()
