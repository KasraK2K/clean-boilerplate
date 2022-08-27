import { DefaultArgs } from "../../common/interfaces/repository"
import { IPromiseResponseObject } from "../../common/interfaces/response"

export const shakeHand = (args: DefaultArgs = {}): IPromiseResponseObject => {
  return new Promise((resolve, reject) => {
    return resolve({ result: { test: "OK" } })
  })
}

export default {
  shakeHand,
}
