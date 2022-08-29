import { IDefaultArgs } from "../../common/interfaces/repository"
import { repository } from "."

export const shakeHand = (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
  return new Promise(async (resolve, reject) => {
    await repository
      .shakeHand()
      .then((result) => resolve({ data: result }))
      .catch((err) => reject({ errCode: err.code }))
  })
}

export default {
  shakeHand,
}
