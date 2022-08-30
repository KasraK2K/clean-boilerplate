import { IDefaultArgs } from "src/common/interfaces/repository.interface"
import * as userLib from "./libs"

export const getUserList = (args: IDefaultArgs = {}): Promise<Record<string, any>[]> => {
  return new Promise(async (resolve, reject) => {
    return await userLib
      .findMany(args)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}

export const addUser = (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
  return new Promise(async (resolve, reject) => {
    return await userLib
      .create(args)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}

export default {
  getUserList,
  addUser,
}
