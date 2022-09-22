import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./module"
import Service from "../../base/Service"
import schema from "./validation/schema"
import validator from "../../common/helpers/validator.helper"
import logger from "../../common/helpers/logger.helper"
import { ServiceName } from "../../common/enums/general.enum"

class PortalUserService extends Service {
  public async list(args: { id?: number; email?: string } = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator(args, schema.list)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.list: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
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
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .profile(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async upsertEntity(args: IDefaultArgs = {}): Promise<Record<string, any>> {
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
        logger.warn(`Validation has error on PortalUserService.upsertEntity: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .upsertEntity(args)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async archiveEntity(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.archiveEntity: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .archiveEntity(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async restoreEntity(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.restoreEntity: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .restoreEntity(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async deleteEntity(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on PortalUserService.deleteEntity: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .deleteEntity(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }
}

export default new PortalUserService()
