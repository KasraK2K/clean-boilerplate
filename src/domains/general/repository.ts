import { IDefaultArgs } from "../../common/interfaces/repository"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import external_domains from "../external_domains"

export const shakeHand = (args: IDefaultArgs = {}): IPromiseResponseObject => {
  return new Promise(async (resolve, reject) => {
    const userList = await external_domains.userDomain
      .getUserList()
      .then((response) => response)
      .catch((err) => reject(err))

    return resolve({ result: userList })
  })
}

export default {
  shakeHand,
}
