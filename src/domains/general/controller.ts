import { Request, Response } from "express"
import { service } from "."
import { addMetaData } from "../../common/helpers/addMetaData"

export const shakeHand = async (req: Request, res: Response): Promise<Record<string, any>> => {
  return await service
    .shakeHand()
    .then((data) => {
      return addMetaData(req, res, data, { errCode: 1000, statusCode: 599 })
    })
    .catch((err) => addMetaData(req, res, {}, { errCode: err.code }))
}

export default {
  shakeHand,
}
