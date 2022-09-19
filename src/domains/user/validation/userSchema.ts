//=============================================================================================
//
//  ##   ##   ####  #####  #####           ####   ####  ##   ##  #####  ###    ###    ###
//  ##   ##  ##     ##     ##  ##         ##     ##     ##   ##  ##     ## #  # ##   ## ##
//  ##   ##   ###   #####  #####           ###   ##     #######  #####  ##  ##  ##  ##   ##
//  ##   ##     ##  ##     ##  ##            ##  ##     ##   ##  ##     ##      ##  #######
//   #####   ####   #####  ##   ##        ####    ####  ##   ##  #####  ##      ##  ##   ##
//
//=============================================================================================

import { GenderEnum } from "./../../../common/enums/general.enum"

export const userSchema = {
  addUser: {
    type: "object",
    additionalProperties: false,
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6, maxLength: 60 },
      phone: { type: "string", minLength: 11, maxLength: 13 },
      first_name: { type: "string", minLength: 3, maxLength: 60 },
      last_name: { type: "string", minLength: 3, maxLength: 60 },
      gender: { type: "string", default: GenderEnum.OTHER },
    },
  },

  getUser: {
    type: "object",
    additionalProperties: false,
    oneOf: [
      {
        required: ["id"],
        properties: {
          id: { type: "string", minLength: 36, maxLength: 36 },
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
}

export default userSchema
