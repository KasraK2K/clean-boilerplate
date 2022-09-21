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
      .getUserList()
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
   * Inset User into users table
   */
  public async upsertUser(req: Request, res: Response): IControllerResponse {
    return await service
      .upsertUser(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }
}

export default new UserController()
