import { Request, Response } from "express"
import { IControllerResponse } from "src/common/interfaces/response.interface"
import { service } from "."
import { addMetaData } from "../../common/helpers/addMetaData.helper"

export const shakeHand = async (req: Request, res: Response): IControllerResponse => {
  return await service
    .shakeHand()
    .then((result) => addMetaData(req, res, { ...result }))
    .catch((err) => addMetaData(req, res, { errCode: err.code }))
}

export const upload = async (req: Request, res: Response): IControllerResponse => {
  console.log(req.body)

  return res.json({ upload: "ok" })
}

export default {
  shakeHand,
  upload,
}
