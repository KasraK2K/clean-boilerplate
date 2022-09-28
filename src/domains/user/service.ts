import config from "config"
import { IGeneralConfig } from "./../../../config/config.interface"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./module"
import Service from "../../base/Service"
import schema from "./validation/schema"
import validator from "../../common/helpers/validator.helper"
import logger from "../../common/helpers/logger.helper"
import { ServiceName, TokenType } from "../../common/enums/general.enum"
import tokenHelper from "../../common/helpers/token.helper"
import bcryptHelper from "../../common/helpers/bcrypt.helper"
import cypherUtil from "../../common/utils/cypher.util"
import mailgunJs from "../../integrations/mailgun.js"

const generalConfig: IGeneralConfig = config.get("general")

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
              return resolve({ data: super.createToken({ id: user.id }) })
            else return reject({ errCode: 1015 })
          })
          .catch((err) => reject(err))
    })
  }

  // TODO: Verify Secret with Frontend
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
          return resolve({ data: super.createToken({ id: verifiedToken.data.id }) })
          // else return reject({ errCode: 1010 })
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
          dest: "service",
        })
        return reject({ errors })
      } else {
        const user = await this.findOne({ email })
        const forgotToken = cypherUtil.textToCypher(`${user.id}--${user.email}`)

        if (user) {
          mailgunJs.message.createMessage({
            to: ["Kasra.Karami.Word@gmail.com"],
            subject: "forgot clean-boilerplate password",
            html: /* HTML */ `
              <h1>Forgot Password</h1>
              <br />
              <p>
                To reset your password click
                <a href="${generalConfig.frontendDomain}/auth/forgot-password?i=${forgotToken}" target="_blank">here</a>
              </p>
            `,
          })

          return resolve({})
        } else return reject({ errCode: 1016 })
      }
    })
  }

  public async resetPassword(args: { secure: string; password: string }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(args, schema.resetPassword)

      if (!valid) {
        logger.warn(`Validation has error on UserService.resetPassword: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else {
        const { secure, password } = args
        const decodedToken = cypherUtil.cypherToText(secure)
        const [id, email] = decodedToken.split("--")
        const user = await this.findOne({ id: +id, email })

        if (user) {
          const hashedPassword = bcryptHelper.hashGen(password)
          this.upsert({ id: +id, email, password: hashedPassword })
            .then((result) => resolve({ ...result }))
            .catch((err) => reject(err))
        } else return reject({ errCode: 1016 })
      }
    })
  }

  // TODO: Move to libs
  private async findOne(args: { id?: number; email?: string } = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(args, schema.list)

      if (!valid) {
        logger.warn(`Validation has error on UserService.findOne: ${errors}`, {
          service: ServiceName.USER,
          dest: "service",
        })
        return reject({ errors })
      } else
        await this.list(args)
          .then((result) => {
            if (result.data.length) resolve(result.data[0])
            else reject(undefined)
          })
          .catch((err) => {
            logger.error(`Error on getting user in UserService.resetPassword: ${err.message}`, {
              service: ServiceName.USER,
              dest: "service",
            })
            return reject(undefined)
          })
    })
  }
}

export default new UserService()
