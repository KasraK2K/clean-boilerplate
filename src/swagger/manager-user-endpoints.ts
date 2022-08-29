import { TagsEnum } from "./enums"

export default {
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: M A N A G E R   L I S T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  "/mng-users/list": {
    post: {
      tags: [TagsEnum.MANAGER_USER],
      summary: "Returns list of manager users.",
      description: "This api is created to get list of manager users.",
      security: [{ bearerAuth: [] }],
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
  // ──────────────────────────────────────────────────────────────────────────────
  //   :::::: M A N A G E R   U P S E R T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────
  "/mng-users/upsert": {
    post: {
      tags: [TagsEnum.MANAGER_USER],
      summary: "Returns list of manager users.",
      description: "This api is created to get list of manager users.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              in: "body",
              required: ["api_key", "name", "email"],
              properties: {
                api_key: {
                  type: "string",
                  example: { $ref: "#/variables/api_key" },
                },
                id: {
                  type: "integer",
                  example: { $ref: "#/variables/user/id" },
                },
                name: {
                  type: "string",
                  example: { $ref: "#/variables/user/name" },
                },
                email: {
                  type: "string",
                  example: { $ref: "#/variables/user/email" },
                },
                access: {
                  type: "string",
                  example: { $ref: "#/variables/user/access" },
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
