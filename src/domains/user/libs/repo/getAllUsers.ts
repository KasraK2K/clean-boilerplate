import { IDefaultArgs } from "src/common/interfaces/repository.interface"

export const getAllUsers = (args: IDefaultArgs = {}): Promise<Record<string, any>[]> => {
  return new Promise((resolve) => {
    return resolve([
      { id: 1, name: "Kasra" },
      { id: 1, name: "Kaveh" },
    ])
  })
}

export default getAllUsers
