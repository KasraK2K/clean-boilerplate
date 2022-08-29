import { TagsEnum } from "./enums"

export default {
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: S H A K E   H A N D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  "/shake-hand": {
    post: {
      tags: [TagsEnum.GENERAL],
      summary: "Returns information about the server like version, name, etc.",
      description:
        "This api is created to get server information and to check if the server is running. no need to send authorization token but for security reason, you should send api key.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              in: "body",
              required: ["api_key"],
              properties: {
                api_key: {
                  type: "string",
                  example: { $ref: "#/variables/api_key" },
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "OK" },
        401: { description: "Unauthorized" },
      },
    },
  },
  // ────────────────────────────────────────────────────────────
  //   :::::: L O G I N : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────
  "/login": {
    post: {
      tags: [TagsEnum.GENERAL],
      summary: "Returns login token.",
      description: "This api is created to get login token if email and password is correct.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              in: "body",
              required: ["api_key", "email", "password"],
              properties: {
                api_key: {
                  type: "string",
                  example: { $ref: "#/variables/api_key" },
                },
                email: {
                  type: "string",
                  example: { $ref: "#/variables/user/email" },
                },
                password: {
                  type: "string",
                  example: { $ref: "#/variables/user/password" },
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "OK" },
        401: { description: "Unauthorized" },
      },
    },
  },
}
