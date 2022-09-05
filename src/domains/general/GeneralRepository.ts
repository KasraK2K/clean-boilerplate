import Repository from "../../base/repository/Repository"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import domains from "../connect"

export class GeneralRepository extends Repository {
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const userList: Record<string, any>[] = await domains.connectUser
        .getUserList()
        .then((response) => response.result)
        .catch((err) => [])

      return resolve(userList)
    })
  }
}

export default new GeneralRepository()
