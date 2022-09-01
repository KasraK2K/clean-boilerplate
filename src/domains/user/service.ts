import { IDefaultArgs } from "../../common/interfaces/repository.interface"
import { repository } from "."
import Service from "../../base/Service"

class UserService extends Service {
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) =>
      repository
        .getUserList()
        .then((result) => resolve({ data: result }))
        .catch((err) => reject(err))
    )
  }

  public async addUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise((resolve, reject) =>
      repository
        .addUser(args)
        .then((result) => resolve({ data: result }))
        .catch((err) => reject(err))
    )
  }
}

export default new UserService()
