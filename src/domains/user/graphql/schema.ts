import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import { Context } from "../../../graphql/context"
import { service } from "../user.module"

const typeDefs = /* GraphQL */ `
  type User {
    id: ID
    email: String!
    name: String
  }

  type Query {
    getUserList: [User]
  }
`

const resolvers = {
  Query: {
    getUserList: async (_parent: Record<string, any>, _args: Record<string, any>, context: Context) => {
      return new Promise((resolve, reject) => {
        context.connect.user
          .getUserList()
          .then((result) => resolve(result.data))
          .catch((err) => reject(err))
      })

      // return new Promise((resolve, reject) =>
      //   service
      //     .getUserList()
      //     .then((result) => resolve(result.data))
      //     .catch((err) => reject(err))
      // )
    },
  },
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
