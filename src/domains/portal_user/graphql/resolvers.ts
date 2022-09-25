import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const domain_name = "portal_user"

const resolvers = {
  Query: {
    [domain_name]: (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      const portalUser = context.connect.portalUser
      const tokenData = context.tokenData

      return {
        list: async (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            portalUser
              .list(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        profile: async () => {
          return new Promise((resolve, reject) => {
            portalUser
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
      const portalUser = context.connect.portalUser

      return {
        upsert: async (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            portalUser
              .upsert(args.update ?? args.create)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        archive: async (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            portalUser
              .archive(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        restore: async (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            portalUser
              .restore(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        delete: async (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            portalUser
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
