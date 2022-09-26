import { Context } from "../../../graphql/context"
import { service } from "../module"

const domain_name = "user"

const resolvers = {
  Query: {
    [domain_name]: (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      const user = context.connect.user
      const tokenData = context.tokenData

      return {
        list: (args: Record<string, any>) => {
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
        upsert: (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            user
              .upsert(args.update ?? args.create)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        archive: (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            user
              .archive(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        restore: (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            user
              .restore(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        toggle: (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            user
              .toggle(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        delete: (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            user
              .delete(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },
      }
    },
  },
}

export default resolvers
