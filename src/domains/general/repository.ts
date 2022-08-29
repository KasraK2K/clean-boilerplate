import { IDefaultArgs } from "../../common/interfaces/repository.interface"
import external_domains from "../external_domains"

export const getUserList = (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
  return new Promise(async (resolve, reject) => {
    const userList: Record<string, any>[] = await external_domains.userDomain
      .getUserList()
      .then((response) => {
        console.log(response)
        return response.result
      })
      .catch((err) => [])

    return resolve(userList)
  })
}

export default {
  getUserList,
}
