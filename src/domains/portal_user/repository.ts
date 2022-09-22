import Repository from "../../base/repository/Repository"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import * as library from "./libs"

class PortalUserRepository extends Repository {
  public async list(args: IDefaultArgs = {}): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.portalUserPgLibrary
        .list(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async profile(id: number): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.portalUserPgLibrary
        .profile(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async upsertEntity(args: IDefaultArgs = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.portalUserPgLibrary
        .upsertEntity(args)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async archiveEntity(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.portalUserPgLibrary
        .archiveEntity(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async restoreEntity(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.portalUserPgLibrary
        .restoreEntity(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  public async deleteEntity(id: number): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      return await library.repo.portalUserPgLibrary
        .deleteEntity(id)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }
}

export default new PortalUserRepository()
