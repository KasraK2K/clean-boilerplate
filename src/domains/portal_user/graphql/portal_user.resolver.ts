import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const resolver = {
  Query: {
    portal_user: {
      list: async (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
        return new Promise((resolve, reject) => {
          context.connect.portalUser
            .list(args)
            .then((result) => resolve(result.data))
            .catch((err) => reject(err))
        })
      },

      profile: async (_parent: Record<string, any>, _args: Record<string, any>, context: Context) => {
        return new Promise((resolve, reject) => {
          context.connect.portalUser
            .profile(context.tokenData.id)
            .then((result) => resolve(result.data))
            .catch((err) => reject(err))
        })
      },
    },
  },

  Mutation: {
    portal_user: {
      upsert: async (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
        return new Promise((resolve, reject) => {
          context.connect.portalUser
            .upsert(args.update ?? args.create)
            .then((result) => resolve(result.data))
            .catch((err) => reject(err))
        })
      },

      archive: async (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
        return new Promise((resolve, reject) => {
          context.connect.portalUser
            .archive(args.id)
            .then((result) => resolve(result.data))
            .catch((err) => reject(err))
        })
      },

      restore: async (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
        return new Promise((resolve, reject) => {
          context.connect.portalUser
            .restore(args.id)
            .then((result) => resolve(result.data))
            .catch((err) => reject(err))
        })
      },

      delete: async (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
        return new Promise((resolve, reject) => {
          context.connect.portalUser
            .delete(args.id)
            .then((result) => resolve(result.data))
            .catch((err) => reject(err))
        })
      },
    },
  },
}

export default resolver
