import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import { typeDefs as scalarTypeDefs } from "graphql-scalars"
import { Context } from "../../../graphql/context"
import { service } from "../module"

const typeDefs = /* GraphQL */ `
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

    created_at: String!
    updated_at: String!
    archived_at: String
  }

  type Query {
    list(id: Int, email: String): [User]!
    # profile: User
  }
`

const resolvers = {
  Query: {
    list: async (_parent: Record<string, any>, args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .list(args)
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })
    },

    // profile: async (_parent: Record<string, any>, _args: Record<string, any>, context: Context) => {
    //   return new Promise((resolve, reject) => {
    //     context.connect.user.profile()
    //       .then((result) => resolve(result.data))
    //       .catch((err) => reject(err))
    //   })
    // },
  },
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
