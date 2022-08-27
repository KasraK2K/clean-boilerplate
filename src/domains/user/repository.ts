import { DefaultArgs } from "../../common/interfaces/repository"
import { IPromiseResponseObject } from "../../common/interfaces/response"

export const getUserList = (args: DefaultArgs = {}): IPromiseResponseObject => {
  return new Promise((resolve, reject) => {
    return resolve({
      result: [
        { id: 1, name: "Kasra" },
        { id: 1, name: "Kaveh" },
      ],
    })
  })
}

export default {
  getUserList,
}
