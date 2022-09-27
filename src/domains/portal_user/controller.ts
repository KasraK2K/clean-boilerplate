import Controller from "../../base/Controller"
import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "./module"
import { IControllerResponse } from "../../common/interfaces/response.interface"

class PortalUserController extends Controller {
  /**
   * Get all portal_users
   */
  public async list(req: Request, res: Response): IControllerResponse {
    return await service
      .list(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Get current portal_user by token.id in res.locals.tokenData.id
   */
  public async profile(req: Request, res: Response): IControllerResponse {
    return await service
      .profile(res.locals.tokenData.id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Create new portal_user if req.body.id not found or Update existing portal_user if found req.body.id
   */
  public async upsert(req: Request, res: Response): IControllerResponse {
    return await service
      .upsert(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Archive portal_user and set is_archive = true and archived_at = NOW()
   */
  public async archive(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .archive(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Restore portal_user and set is_archive = false and archived_at = null
   */
  public async restore(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .restore(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Permanently delete portal_user
   */
  public async delete(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .delete(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }
}

export default new PortalUserController()