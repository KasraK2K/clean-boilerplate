// ─── PACKAGES ────────────────────────────────────────────────────────────────
import { Request, Response, NextFunction } from "express"

import Controller from "../../base/Controller"
import { IControllerResponse } from "../../common/interfaces/response.interface"
import { service } from "./module"
import { addMetaData } from "../../common/helpers/addMetaData.helper"

class GeneralController extends Controller {
  public async userList(req: Request, res: Response, next: NextFunction): Promise<void> {
    await super.handle(service.userList, undefined, req, res, next)
  }

  public async upload(req: Request, res: Response): IControllerResponse {
    return addMetaData(req, res, { data: { body: req.body } })
  }
}

export default new GeneralController()
