import Controller from "../../base/Controller"
import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "."
import { IControllerResponse } from "../../common/interfaces/response.interface"
import validator from "../../common/helpers/validator.helper"
import schema from "./validation/schema"
import logger from "../../common/helpers/logger.helper"
import { ServiceName } from "../../common/enums/general.enum"

class UserController extends Controller {
  public async shakeHand(req: Request, res: Response): IControllerResponse {
    return addMetaData(req, res, {})
  }

  public async getUserList(req: Request, res: Response): IControllerResponse {
    return await service
      .getUserList()
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { errCode: err.code }))
  }

  public async addUser(req: Request, res: Response): IControllerResponse {
    const args = req.body

    const { valid, errors } = validator(args, schema.addUser)

    if (!valid) {
      logger.warn(`Validation has error on addUser: ${errors}`, { service: ServiceName.USER, dest: "controller" })
      return addMetaData(req, res, { errors })
    } else {
      return await service
        .addUser(args)
        .then((result) => addMetaData(req, res, { ...result }))
        .catch((err) => addMetaData(req, res, { errCode: err.code }))
    }
  }
}

export default new UserController()
