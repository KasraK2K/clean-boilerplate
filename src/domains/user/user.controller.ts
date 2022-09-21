import Controller from "../../base/Controller"
import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "./user.module"
import { IControllerResponse } from "../../common/interfaces/response.interface"

class UserController extends Controller {
  /**
   * Get all users
   */
  public async getUserList(req: Request, res: Response): IControllerResponse {
    return await service
      .getUserList(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Get current user by token.id in res.locals.tokenData.id
   */
  public async getUserProfile(req: Request, res: Response): IControllerResponse {
    return await service
      .getUserProfile(res.locals.tokenData.id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Create new user if req.body.id not found or Update existing user if found req.body.id
   */
  public async upsertUser(req: Request, res: Response): IControllerResponse {
    return await service
      .upsertUser(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Archive user and set is_archive = true and archived_at = NOW()
   */
  public async archiveUser(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .archiveUser(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Restore user and set is_archive = false and archived_at = null
   */
  public async restoreUser(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .restoreUser(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Permanently delete user
   */
  public async deleteUser(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .deleteUser(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }
}

export default new UserController()
