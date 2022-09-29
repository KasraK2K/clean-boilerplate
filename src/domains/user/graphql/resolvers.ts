import { IDefaultArgs } from "./../../../common/interfaces/general.interface"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const domain_name = "user"

const resolvers = {
  Query: {
    [domain_name]: (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      const user = context.connect.user
      const tokenData = context.tokenData

      return {
        list: (args: { id?: number; email?: string }) => {
          return new Promise((resolve, reject) => {
            user
              .list(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        profile: () => {
          return new Promise((resolve, reject) => {
            user
              .profile(tokenData.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },
      }
    },
  },

  Mutation: {
    [domain_name]: (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      const user = context.connect.user

      return {
        upsert: (args: IDefaultArgs) => {
          return new Promise((resolve, reject) => {
            user
              .upsert(args.update ?? args.create)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        archive: (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            user
              .archive(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        restore: (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            user
              .restore(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        toggle: (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            user
              .toggle(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        delete: (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            user
              .delete(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        login: (args: { email: string; password: string; reseller_id: number }) => {
          return new Promise((resolve, reject) => {
            user
              .login(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        refreshToken: (args: { refresh_token: string; secret: string }) => {
          return new Promise((resolve, reject) => {
            user
              .refreshToken(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        forgotPassword: (args: { email: string }) => {
          return new Promise((resolve, reject) => {
            user
              .forgotPassword(args.email)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        resetPassword: (args: { secret: string; password: string }) => {
          return new Promise((resolve, reject) => {
            user
              .resetPassword(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },
      }
    },
  },
}

export default resolvers
