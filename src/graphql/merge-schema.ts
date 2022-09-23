import { mergeSchemas } from "@graphql-tools/schema"
import { schema as UserSchema } from "../domains/user/graphql/schema"
import { schema as PortalUserSchema } from "../domains/portal_user/graphql/schema"

const mergedSchema = mergeSchemas({
  schemas: [UserSchema /*PortalUserSchema*/],
})

export default mergedSchema
