import { IDefaultArgs } from "../../common/interfaces/repository"
import { repository } from "."

export const getUserList = (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) =>
    repository
      .getUserList()
      .then((result) => resolve({ data: result }))
      .catch((err) => reject(err))
  )
}

export default {
  getUserList,
}
