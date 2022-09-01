import Controller from "../../base/Controller"
import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "."
import { IControllerResponse } from "../../common/interfaces/response.interface"
import validator from "../../common/helpers/validator.helper"
import schema from "./libs/schema/schema"
import logger from "../../common/helpers/logger.helper"
// import rabbitMQ from "../../integrations/rabbitmq"

class UserController extends Controller {
  public async shakeHand(req: Request, res: Response): IControllerResponse {
    // const queue_name = "rabbitmq_starter_queue"
    // rabbitMQ.ack.producer({ name: "Kasra" }, queue_name)

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
      logger.warn(`Validation has error on addUser: ${errors}`, { service: "user", dest: "controller" })
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
