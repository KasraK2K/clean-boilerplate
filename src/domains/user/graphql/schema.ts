import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const typeDefs = [
  ...scalarTypeDefs,

  /* GraphQL */ `
    enum Gender {
      MALE
      FEMALE
      OTHER
    }

    type User {
      id: ID
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

    type Query {
      list(id: Int, email: String): [User]!
      profile: [User!]!
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
          .then((result) => {
            console.log(result.data)
            return resolve(result.data)
          })
          .catch((err) => reject(err))
      })
    },
  },
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
