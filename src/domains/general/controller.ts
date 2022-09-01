import Controller from "../../base/Controller"
import { Request, Response } from "express"
import { IControllerResponse } from "../../common/interfaces/response.interface"
import { service } from "."
import { addMetaData } from "../../common/helpers/addMetaData.helper"

class GeneralController extends Controller {
  public async shakeHand(req: Request, res: Response): IControllerResponse {
    return addMetaData(req, res, {})
  }

  public async getUserList(req: Request, res: Response): IControllerResponse {
    return await service
      .getUserList()
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { errCode: err.code }))
  }

  public async upload(req: Request, res: Response): IControllerResponse {
    return addMetaData(req, res, { data: { body: req.body } })
  }
}

export default new GeneralController()
