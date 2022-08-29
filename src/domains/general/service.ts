import { IDefaultArgs } from "../../common/interfaces/repository.interface"
import { repository } from "."

export const getUserList = (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
  return new Promise(async (resolve, reject) => {
    await repository
      .getUserList()
      .then((result) => resolve({ data: result }))
      .catch((err) => reject({ errCode: err.code }))
  })
}

export default {
  getUserList,
}
