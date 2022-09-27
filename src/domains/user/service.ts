import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./module"
import Service from "../../base/Service"
import schema from "./validation/schema"
import validator from "../../common/helpers/validator.helper"
import logger from "../../common/helpers/logger.helper"
import { ServiceName, TokenType } from "../../common/enums/general.enum"
import tokenHelper from "../../common/helpers/token.helper"
import bcryptHelper from "../../common/helpers/bcrypt.helper"
import user from "src/swagger/domains/user"

class UserService extends Service {
  public async list(args: { id?: number; email?: string } = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator(args, schema.list)

      if (!valid) {
        logger.warn(`Validation has error on UserService.list: ${errors}`, {
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
        logger.warn(`Validation has error on UserService.profile: ${errors}`, {
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
        logger.warn(`Validation has error on UserService.upsert: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .upsert(args)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async archive(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on UserService.archive: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
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
        logger.warn(`Validation has error on UserService.restore: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .restore(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async toggle(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on UserService.toggle: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .toggle(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async delete(id: number): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ id }, schema.id)

      if (!valid) {
        logger.warn(`Validation has error on UserService.delete: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        repository
          .delete(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async login(args: { email: string; password: string; reseller_id: number }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(args, schema.login)

      if (!valid) {
        logger.warn(`Validation has error on UserService.login: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        await repository
          .getNonBlockedExistUser(args)
          .then((user) => {
            if (user && bcryptHelper.compareHash(args.password, user.password))
              return resolve({ data: this.createToken({ id: user.id }) })
            else return reject({ errCode: 1015 })
          })
          .catch((err) => reject(err))
    })
  }

  public async refreshToken(token: string, secret: string): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator({ token }, schema.refreshToken)

      if (!valid) {
        logger.warn(`Validation has error on UserService.refreshToken: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else {
        const verifiedToken = tokenHelper.verify(token)
        const verifiedSecret = tokenHelper.verify(token)

        if (!verifiedSecret.valid || !verifiedToken.valid) return reject({ errCode: 1010 })
        else if (verifiedToken.data.type !== TokenType.REFRESH) return reject({ errCode: 1010 })
        else {
          // get user
          // check user.email === verfiedSecret.data.email
          // if
          return resolve({ data: this.createToken({ id: verifiedToken.data.id }) })
          // else return reject({ errCode: 1010 })
        }
      }
    })
  }

  private createToken(payload: { id: number }): {
    token: string
    expire_token_in: string
    refresh_token: string
    expire_refresh_token_in: string
  } {
    const expire_token_in = "2 days"
    const expire_refresh_token_in = "4 days"

    const token = tokenHelper.sign({ id: payload.id, type: TokenType.TOKEN }, { expiresIn: expire_token_in })
    const refresh_token = tokenHelper.sign(
      { id: payload.id, type: TokenType.REFRESH },
      { expiresIn: expire_refresh_token_in }
    )
    return { token, expire_token_in, refresh_token, expire_refresh_token_in }
  }
}

export default new UserService()
