import { IDefaultArgs } from "../../common/interfaces/repository"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { repository } from "."

export const getUserList = (args: IDefaultArgs = {}): IPromiseResponseObject => {
  return new Promise((resolve, reject) =>
    repository
      .getUserList()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  )
}

export default {
  getUserList,
}
