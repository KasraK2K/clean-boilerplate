import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import globalTypes from "../../../graphql/globalTypes"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const typeDefs = [
  globalTypes,

  /* GraphQL */ `
    type PortalUser {
      id: ID!
      email: String!
      password: String!
      contact_number: String!
      first_name: String!
      surname: String!
      gender: Gender!

      is_active: Boolean!
      is_admin: Boolean!
      is_archive: Boolean!

      business_name: String!
      business_category: String!
      business_size: String!
      permission: Int!
      reseller_id: Int!

      created_at: DateTime!
      updated_at: DateTime!
      archived_at: DateTime
    }

    input CreatePortalUserInput {
      email: String!
      password: String!
      contact_number: String
      first_name: String
      surname: String
      gender: Gender
      business_name: String
      business_category: String
      business_size: String
      permission: Int
      reseller_id: Int
    }

    input UpdatePortalUserInput {
      id: ID!
      email: String
      password: String
      contact_number: String
      first_name: String
      surname: String
      gender: Gender
      business_name: String
      business_category: String
      business_size: String
      permission: Int
      reseller_id: Int
      is_active: Boolean
      is_admin: Boolean
      is_archive: Boolean
    }

    type Query {
      list(id: ID, email: String): [PortalUser]!
      profile: [PortalUser!]!
    }

    type Mutation {
      upsert(create: CreatePortalUserInput, update: UpdatePortalUserInput): [PortalUser]!
      archive(id: ID!): [PortalUser]!
      restore(id: ID!): [PortalUser]!
      delete(id: ID!): [PortalUser]!
    }
  `,
]

const resolvers = {
  Query: {
    list: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.portalUser
          .list(args)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    profile: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.portalUser
          .profile(context.tokenData.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },
  },

  Mutation: {
    upsert: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.portalUser
          .upsert(args.update ?? args.create)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    archive: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.portalUser
          .archive(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    restore: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.portalUser
          .restore(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    delete: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.portalUser
          .delete(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },
  },
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
