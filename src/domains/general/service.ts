import { IDefaultArgs } from "../../common/interfaces/repository"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { repository } from "."

export const shakeHand = (args: IDefaultArgs = {}): IPromiseResponseObject => {
  return new Promise((resolve, reject) =>
    repository
      .shakeHand()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  )
}

export default {
  shakeHand,
}
