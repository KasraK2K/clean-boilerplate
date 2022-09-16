import { makeExecutableSchema } from "@graphql-tools/schema"
import { DateTimeResolver } from "graphql-scalars"
import { Context } from "../../../graphql/context"
import * as library from "../libs"

const typeDefs = /* GraphQL */ `
  type User {
    id: ID
    email: String!
    name: String
  }

  type Query {
    allUsers: [User]
    list: [User]
  }
`

const resolvers = {
  Query: {
    allUsers: (_parent: Record<string, any>, _args: Record<string, any>, context: Context) => {
      return context.prisma.user.findMany()
    },

    list: async () => {
      return await library.repo.userPgLibrary.findMany()
    },
  },
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
