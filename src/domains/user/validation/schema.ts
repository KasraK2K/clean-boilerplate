export const userSchema = {
  addUser: {
    type: "object",
    additionalProperties: false,
    required: ["email", "name"],
    properties: {
      email: { type: "string", format: "email" },
      name: { type: "string", minLength: 3, maxLength: 60 },
      posts_title: { type: "string", minLength: 10, maxLength: 255 },
      profile_bio: { type: "string", minLength: 10, maxLength: 255 },
    },
  },
}

export default userSchema
