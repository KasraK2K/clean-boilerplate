import { DefaultArgs } from "../../common/interfaces/repository"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { external } from "."

export const shakeHand = (args: DefaultArgs = {}): IPromiseResponseObject => {
  return new Promise(async (resolve, reject) => {
    const userList = await external.userDomain
      .getUserList()
      .then((response) => response.result)
      .catch((err) => reject(err))

    return resolve({ result: userList })
  })
}

export default {
  shakeHand,
}
