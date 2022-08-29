import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "."
import { IControllerResponse } from "src/common/interfaces/response.interface"

export const shakeHand = async (req: Request, res: Response): IControllerResponse => {
  return addMetaData(req, res, {})
}

export const getUserList = async (req: Request, res: Response): IControllerResponse => {
  return await service
    .getUserList()
    .then((result) => addMetaData(req, res, { ...result }))
    .catch((err) => addMetaData(req, res, { errCode: err.code }))
}

export default {
  shakeHand,
  getUserList,
}
