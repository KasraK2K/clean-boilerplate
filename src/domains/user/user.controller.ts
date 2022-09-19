import Controller from "../../base/Controller"
import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "./user.module"
import { IControllerResponse } from "../../common/interfaces/response.interface"

class UserController extends Controller {
  public async getUserList(req: Request, res: Response): IControllerResponse {
    return await service
      .getUserList()
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  public async getUserProfile(req: Request, res: Response): IControllerResponse {
    return await service
      .getUserProfile({ id: res.locals.tokenData.id })
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  public async addUser(req: Request, res: Response): IControllerResponse {
    return await service
      .addUser(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }
}

export default new UserController()
