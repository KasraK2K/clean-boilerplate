import Repository from "../../base/Repository"
import { IDefaultArgs } from "../../common/interfaces/repository.interface"
import * as userLib from "./libs"

class UserRepository extends Repository {
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await userLib
        .findMany(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async addUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await userLib
        .create(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }
}

export default new UserRepository()
