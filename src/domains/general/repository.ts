import Repository from "../../base/repository/Repository"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import external_domains from "../external_domains"

export class GeneralRepository extends Repository {
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const userList: Record<string, any>[] = await external_domains.userDomain
        .getUserList()
        .then((response) => response.result)
        .catch((err) => [])

      return resolve(userList)
    })
  }
}

export default new GeneralRepository()
