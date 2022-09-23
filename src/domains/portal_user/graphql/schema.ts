import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import globalTypes from "../../../graphql/globalTypes"
import { Context } from "../../../graphql/context"
import { service } from "../module"

console.log()

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
      upsertEntity(create: CreateUserInput, update: UpdateUserInput): [User]!
      archiveEntity(id: ID!): [User]!
      restoreEntity(id: ID!): [User]!
      deleteEntity(id: ID!): [User]!
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
    upsertEntity: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .upsertEntity(args.update ?? args.create)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    archiveEntity: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .archiveEntity(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    restoreEntity: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .restoreEntity(args.id)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    deleteEntity: async (parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .deleteEntity(args.id)
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
