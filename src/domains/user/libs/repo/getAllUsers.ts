import { IDefaultArgs } from "src/common/interfaces/repository"
import { IPromiseResponseObject } from "src/common/interfaces/response"

export const getAllUsers = (args: IDefaultArgs = {}): IPromiseResponseObject => {
  return new Promise((resolve) => {
    return resolve({
      result: [
        { id: 1, name: "Kasra" },
        { id: 1, name: "Kaveh" },
      ],
    })
  })
}

export default getAllUsers
