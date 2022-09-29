// ─── PACKAGES ────────────────────────────────────────────────────────────────
import { composeResolvers } from "@graphql-tools/resolvers-composition"

// ─── MODULES ─────────────────────────────────────────────────────────────────
import graphAuthMiddleware from "../../../graphql/middlewares/GraphAuthMiddleware"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const domain_name = "user"

const resolvers = {
  Query: {
    [domain_name]: (
      root: Record<string, any>,
      args: Record<string, any>,
      context: Context,
      info: Record<string, any>
    ) => {
      const user = context.connect.user
      const tokenData = context.tokenData
      const operationName = info.fieldNodes[0].selectionSet.selections[0].name.value

      return {
        list(args: { id?: number; email?: string }) {
          return new Promise((resolve, reject) => {
            user
              .list(args)
              .then((result) => resolve(result.data))
              .catch((err) => reject(err))
          })
        },

        profile() {
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
    [domain_name]: (root: Record<string, any>, args: Record<string, any>, context: Context) => {
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

const resolversComposition = {
  // "Query.user": [graphAuthMiddleware.isAuthenticated],
}

const composedResolvers = composeResolvers(resolvers, resolversComposition)

export default composedResolvers

// export default resolvers
