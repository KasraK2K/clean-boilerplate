import { typeDefs as scalarTypeDefs } from "graphql-scalars"

const globalTypes = [
  ...scalarTypeDefs,

  /* GraphQL */ `
    enum Gender {
      MALE
      FEMALE
      OTHER
    }
  `,
]

export default globalTypes
