import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import globalTypes from "../../../graphql/globalTypes"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const typeDefs = [
  globalTypes,

  /* GraphQL */ `
    type User {
      id: ID!
      email: String!
      password: String!
      contact_number: String!
      first_name: String!
      surname: String!
      gender: Gender!

      is_active: Boolean!
      is_verified: Boolean!
      is_blocked: Boolean!
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

    input CreateUserInput {
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

    input UpdateUserInput {
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
      is_verified: Boolean
      is_blocked: Boolean
      is_archive: Boolean
    }

    type Query {
      list(id: ID, email: String): [User]!
      profile: [User!]!
    }

    type Mutation {
      upsert(create: CreateUserInput, update: UpdateUserInput): [User]!
      archive(id: ID!): [User]!
      restore(id: ID!): [User]!
      delete(id: ID!): [User]!
    }
  `,
]

const resolvers = {
  Query: {
    list: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .list(args)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    profile: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .profile(context.tokenData.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },
  },

  Mutation: {
    upsert: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .upsert(args.update ?? args.create)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    archive: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .archive(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    restore: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .restore(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    delete: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
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
