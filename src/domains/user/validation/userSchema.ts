//=============================================================================================
//
//  ##   ##   ####  #####  #####           ####   ####  ##   ##  #####  ###    ###    ###
//  ##   ##  ##     ##     ##  ##         ##     ##     ##   ##  ##     ## #  # ##   ## ##
//  ##   ##   ###   #####  #####           ###   ##     #######  #####  ##  ##  ##  ##   ##
//  ##   ##     ##  ##     ##  ##            ##  ##     ##   ##  ##     ##      ##  #######
//   #####   ####   #####  ##   ##        ####    ####  ##   ##  #####  ##      ##  ##   ##
//
//=============================================================================================

import { BusinessSize, Gender } from "./../../../common/enums/general.enum"

export const userSchema = {
  // ─── Get One ────────────────────────────────────────────────────────────────────
  getOne: {
    type: "object",
    additionalProperties: false,
    oneOf: [
      {
        required: ["id"],
        properties: {
          id: { type: "integer" },
        },
      },
      {
        required: ["email"],
        properties: {
          email: { type: "string", format: "email" },
        },
      },
    ],
  },

  // ─── Create ─────────────────────────────────────────────────────────────────────
  create: {
    type: "object",
    additionalProperties: false,
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6, maxLength: 60 },
      contact_number: { type: "string", minLength: 11, maxLength: 13 },
      first_name: { type: "string", minLength: 3, maxLength: 60 },
      surname: { type: "string", minLength: 3, maxLength: 60 },
      gender: { type: "string", enum: Object.values(Gender), default: Gender.OTHER },
      business_name: { type: "string", minLength: 3, maxLength: 60 },
      business_category: { type: "string", minLength: 3, maxLength: 20 },
      business_size: { type: "string", enum: Object.values(BusinessSize) },
      permission: { type: "integer", default: 0 },
      reseller_id: { type: "integer", default: 0 },
    },
  },

  // ─── Upsert ─────────────────────────────────────────────────────────────────────
  upsert: {
    type: "object",
    additionalProperties: false,
    required: ["id", "email", "password"],
    properties: {
      id: { type: "integer" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6, maxLength: 60 },
      contact_number: { type: "string", minLength: 11, maxLength: 13 },
      first_name: { type: "string", minLength: 3, maxLength: 60 },
      surname: { type: "string", minLength: 3, maxLength: 60 },
      gender: { type: "string", enum: Object.values(Gender), default: Gender.OTHER },
      business_name: { type: "string", minLength: 3, maxLength: 60 },
      business_category: { type: "string", minLength: 3, maxLength: 20 },
      business_size: { type: "string", enum: Object.values(BusinessSize) },
      permission: { type: "integer", default: 0 },
      reseller_id: { type: "integer", default: 0 },
    },
  },

  // ─── Id ─────────────────────────────────────────────────────────────────────────
  id: {
    type: "object",
    additionalProperties: false,
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  },
}

export default userSchema
