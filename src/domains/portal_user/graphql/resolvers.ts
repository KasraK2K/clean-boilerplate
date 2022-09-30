// ─── PACKAGES ────────────────────────────────────────────────────────────────
import { composeResolvers } from "@graphql-tools/resolvers-composition"

// ─── MODULES ─────────────────────────────────────────────────────────────────
import graphAuthMiddleware from "../../../graphql/middlewares/GraphAuthMiddleware"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const domain_name = "portal_user"

const resolvers = {
  Query: {
    [domain_name]: (
      root: Record<string, any>,
      args: Record<string, any>,
      context: Context,
      info: Record<string, any>
    ) => {
      const portalUser = context.connect.portalUser
      const tokenData = context.tokenData
      const operationName = info.fieldNodes[0].selectionSet.selections[0].name.value

      return {
        list: (args: { id?: number; email?: string }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .list(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        profile: () => {
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
    [domain_name]: (
      root: Record<string, any>,
      args: Record<string, any>,
      context: Context,
      info: Record<string, any>
    ) => {
      const portalUser = context.connect.portalUser

      return {
        upsert: (args: Record<string, any>) => {
          return new Promise((resolve, reject) => {
            portalUser
              .upsert(args.update ?? args.create)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        archive: (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .archive(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        restore: (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .restore(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        toggle: (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .toggle(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        delete: async (args: { id: number }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .delete(args.id)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        login: (args: { email: string; password: string; reseller_id: number }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .login(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        refreshToken: (args: { refresh_token: string; secret: string }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .refreshToken(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        forgotPassword: (args: { email: string }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .forgotPassword(args.email)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        resetPassword: (args: { secret: string; password: string }) => {
          return new Promise((resolve, reject) => {
            portalUser
              .resetPassword(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },
      }
    },
  },
}

const resolversComposition = {
  // "Query.portal_user": [graphAuthMiddleware.isAuthenticated],
}

const composedResolvers = composeResolvers(resolvers, resolversComposition)

export default composedResolvers

// export default resolvers
