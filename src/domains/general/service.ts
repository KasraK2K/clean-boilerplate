import Service from "../../base/Service"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import { repository } from "./module"

class GeneralService extends Service {
  public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await repository
        .getUserList()
        .then((result) => resolve({ data: result }))
        .catch((err) => reject({ errCode: err.code }))
    })
  }
}

export default new GeneralService()
