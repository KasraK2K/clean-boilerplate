import { IDefaultArgs } from "src/common/interfaces/repository"
import { IPromiseResponseObject } from "src/common/interfaces/response"
import { getAllUsers } from "./libs"

export const getUserList = (args: IDefaultArgs = {}): IPromiseResponseObject => {
  return new Promise(async (resolve, reject) => {
    return await getAllUsers(args)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}

export default {
  getUserList,
}
