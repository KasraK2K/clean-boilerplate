import { IDefaultArgs } from "../../common/interfaces/repository"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { repository } from "."

export const shakeHand = (args: IDefaultArgs = {}): IPromiseResponseObject => {
  return new Promise(async (resolve, reject) => {
    await repository
      .shakeHand()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

export default {
  shakeHand,
}
