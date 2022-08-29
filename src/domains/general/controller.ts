import { Request, Response } from "express"
import { IControllerResponse } from "src/common/interfaces/response.interface"
import { service } from "."
import { addMetaData } from "../../common/helpers/addMetaData.helper"

export const shakeHand = async (req: Request, res: Response): IControllerResponse => {
  return addMetaData(req, res, {})
}

export const getUserList = async (req: Request, res: Response): IControllerResponse => {
  return await service
    .getUserList()
    .then((result) => addMetaData(req, res, { ...result }))
    .catch((err) => addMetaData(req, res, { errCode: err.code }))
}

export const upload = async (req: Request, res: Response): IControllerResponse => {
  return addMetaData(req, res, { data: { body: req.body } })
}

export default {
  shakeHand,
  getUserList,
  upload,
}
