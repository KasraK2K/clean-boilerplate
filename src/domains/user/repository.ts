import Repository from "../../base/repository/Repository"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import * as library from "./libs"

class UserRepository extends Repository {
  public async list(args: IDefaultArgs = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .list(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async profile(id: number): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .profile(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async upsertEntity(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .upsertEntity(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async archiveEntity(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .archiveEntity(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async restoreEntity(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .restoreEntity(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async deleteEntity(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.userPgLibrary
        .deleteEntity(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }
}

export default new UserRepository()
