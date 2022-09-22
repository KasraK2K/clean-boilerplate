import { mergeSchemas } from "@graphql-tools/schema"
import { schema as UserSchema } from "../domains/user/graphql/schema"

const mergedSchema = mergeSchemas({
  schemas: [UserSchema],
})

export default mergedSchema
