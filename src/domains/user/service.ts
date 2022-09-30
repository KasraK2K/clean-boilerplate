// ─── PACKAGES ────────────────────────────────────────────────────────────────
import config from "config"

// ─── MODULES ─────────────────────────────────────────────────────────────────
import Service from "../../base/Service"
import schema from "./validation/schema"
import validator from "../../common/helpers/validator.helper"
import logger from "../../common/helpers/logger.helper"
import tokenHelper from "../../common/helpers/token.helper"
import bcryptHelper from "../../common/helpers/bcrypt.helper"
import cypherUtil from "../../common/utils/cypher.util"
import mailgunJs from "../../integrations/mailgun.js"
import { IGeneralConfig } from "./../../../config/config.interface"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./module"
import { ServiceName, TokenType } from "../../common/enums/general.enum"

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const generalConfig: IGeneralConfig = config.get("general")

class UserService extends Service {
  public async list(args: { id?: number; email?: string }): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const { valid, errors } = validator(args, schema.list)

      if (!valid) {
        logger.warn(`Validation has error on Service.list: ${errors}`, {
          service: ServiceName.USER,
          dest: "domains/user/service.ts",
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
          dest: "domains/user/service.ts",
        })
        return reject({ errors })
      } else
        repository
          .profile(id)
          .then((result) => resolve({ data: result }))
          .catch((err) => reject(err))
    })
  }

  public async upsert(args: IDefaultArgs): Promise<Record<string, any>> {
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
          dest: "domains/user/service.ts",
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
        logger.warn(`Validation has error on UserService.archive: ${errors}`, {
          service: ServiceName.USER,
          dest: "domains/user/service.ts",
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
          dest: "domains/user/service.ts",
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
          dest: "domains/user/service.ts",
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
          dest: "domains/user/service.ts",
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
          dest: "domains/user/service.ts",
        })
        return reject({ errors })
      } else
        await repository
          .getExistUser(args)
          .then((user) => {
            if (user && bcryptHelper.compareHash(args.password, user.password))
              return resolve({ data: super.createToken(user) })
            else return reject({ errCode: 1015 })
          })
          .catch((err) => reject(err))
    })
  }

  public async refreshToken(args: { refresh_token: string; secret: string }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(args, schema.refreshToken)

      if (!valid) {
        logger.warn(`Validation has error on UserService.refreshToken: ${errors}`, {
          service: ServiceName.USER,
          dest: "domains/user/service.ts",
        })
        return reject({ errors })
      } else {
        const { refresh_token, secret } = args
        const verifiedToken = tokenHelper.verify(refresh_token)

        if (!verifiedToken.valid || verifiedToken.data.type !== TokenType.REFRESH) return reject({ errCode: 1010 })
        else {
          const decodedToken = cypherUtil.cypherToText(secret)
          const [id, email] = decodedToken.split("--")
          const user = await this.getUserObject({ id: +id, email })

          if (!user) return reject({ errCode: 1010 })
          else return resolve({ data: super.createToken({ id: verifiedToken.data.id }) })
        }
      }
    })
  }

  public async forgotPassword(email: string): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator({ email }, schema.forgotPassword)

      if (!valid) {
        logger.warn(`Validation has error on UserService.forgotPassword: ${errors}`, {
          service: ServiceName.USER,
          dest: "domains/user/service.ts",
        })
        return reject({ errors })
      } else {
        const user = await this.getUserObject({ email })

        if (user) {
          const forgotToken = cypherUtil.textToCypher(`${user.id}--${user.email}`)

          mailgunJs.message
            .createMessage({
              to: [user.email],
              subject: "user reset password link",
              html: /* HTML */ `
                <h1>Forgot Password</h1>
                <br />
                <p>
                  To reset your password click
                  <a href="${generalConfig.frontendDomain}/auth/user/forgot-password?i=${forgotToken}" target="_blank">
                    here
                  </a>
                </p>
              `,
            })
            .then((response) => resolve({ data: response }))
            .catch((err) => {
              logger.error(err, { service: ServiceName.USER, dest: "domains/user/service.ts:forgotPassword" })
              return reject({ errCode: 1017 })
            })
        } else return reject({ errCode: 1016 })
      }
    })
  }

  public async resetPassword(args: { secret: string; password: string }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(args, schema.resetPassword)

      if (!valid) {
        logger.warn(`Validation has error on UserService.resetPassword: ${errors}`, {
          service: ServiceName.USER,
          dest: "domains/user/service.ts",
        })
        return reject({ errors })
      } else {
        const { secret, password } = args
        const decodedToken = cypherUtil.cypherToText(secret)
        const [id, email] = decodedToken.split("--")
        const user = await this.getUserObject({ id: +id, email })

        if (user)
          this.upsert({ id: +id, email, password })
            .then((result) => resolve({ ...result }))
            .catch((err) => reject(err))
        else return reject({ errCode: 1016 })
      }
    })
  }

  private async getUserObject(args: { id?: number; email?: string } = {}): Promise<Record<string, any> | undefined> {
    return await this.list(args)
      .then((result) => {
        if (result.data.length) return result.data[0]
        else return undefined
      })
      .catch((err) => {
        logger.error(`Error on getting user in UserService.getUserObject: ${err.message}`, {
          service: ServiceName.USER,
          dest: "domains/user/service.ts:getUserObject",
        })
        return undefined
      })
  }
}

export default new UserService()
