import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./module"
import Service from "../../base/Service"
import schema from "./validation/schema"
import validator from "../../common/helpers/validator.helper"
import logger from "../../common/helpers/logger.helper"
import { ServiceName } from "../../common/enums/general.enum"
import bcryptHelper from "../../common/helpers/bcrypt.helper"

class PortalUserService extends Service {
  public async list(args: { id?: number; email?: string } = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator(args, schema.list)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.list: ${errors}`, {
          service: ServiceName.USER,
          dest: "portal_user/service.ts",
        })
        return reject({ errors })
      } else
        repository
          .list(args)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async profile(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.profile)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.profile: ${errors}`, {
          service: ServiceName.USER,
          dest: "portal_user/service.ts",
        })
        return reject({ errors })
      } else
        repository
          .profile(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async upsert(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { id } = args
      let valid: boolean
      let errors: string[]

      if (id) {
        const upsertValidation = validator(args, schema.update)
        valid = upsertValidation.valid
        errors = upsertValidation.errors
      } else {
        const createValidation = validator(args, schema.create)
        valid = createValidation.valid
        errors = createValidation.errors
      }

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.upsert: ${errors}`, {
          service: ServiceName.USER,
          dest: "portal_user/service.ts",
        })
        return reject({ errors })
      } else {
        args.password && (args.password = bcryptHelper.hashGen(args.password))
        repository
          .upsert(args)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
      }
    })
  }

  public async archive(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.archive: ${errors}`, {
          service: ServiceName.USER,
          dest: "portal_user/service.ts",
        })
        return reject({ errors })
      } else
        repository
          .archive(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async restore(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.restore: ${errors}`, {
          service: ServiceName.USER,
          dest: "portal_user/service.ts",
        })
        return reject({ errors })
      } else
        repository
          .restore(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async delete(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.delete: ${errors}`, {
          service: ServiceName.USER,
          dest: "portal_user/service.ts",
        })
        return reject({ errors })
      } else
        repository
          .delete(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }
}

export default new PortalUserService()
