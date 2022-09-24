import { Context } from "../../../graphql/context"
import { service } from "../module"

const resolvers = {
  Query: {
    list: (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .list(args)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    profile: (_parent: Record<string, any>, _args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .profile(context.tokenData.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },
  },

  Mutation: {
    upsert: (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .upsert(args.update ?? args.create)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    archive: (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .archive(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    restore: (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .restore(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    delete: (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .delete(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },
  },
}

export default resolvers
