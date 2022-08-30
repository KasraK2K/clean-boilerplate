import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "."
import { IControllerResponse } from "src/common/interfaces/response.interface"
import validator from "../../common/helpers/validator.helper"
import schema from "./libs/schema/schema"
import logger from "../../common/helpers/logger.helper"

export const shakeHand = async (req: Request, res: Response): IControllerResponse => {
  return addMetaData(req, res, {})
}

export const getUserList = async (req: Request, res: Response): IControllerResponse => {
  return await service
    .getUserList()
    .then((result) => addMetaData(req, res, { ...result }))
    .catch((err) => addMetaData(req, res, { errCode: err.code }))
}

export const addUser = async (req: Request, res: Response): IControllerResponse => {
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

export default {
  shakeHand,
  getUserList,
  addUser,
}
