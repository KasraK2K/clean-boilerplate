import Repository from "../../base/repository/Repository"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import * as library from "./libs"

class UserRepository extends Repository {
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .findMany(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async addUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .create(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }
}

export default new UserRepository()
