import Repository from "../../base/repository/Repository"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import connect from "../connect/connect.module"

export class GeneralRepository extends Repository {
  public async userList(args: IDefaultArgs): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const userList: Record<string, any>[] = await connect.user
        .list(args)
        .then((response) => response.result)
        .catch((err) => [])

      return resolve(userList)
    })
  }
}

export default new GeneralRepository()
