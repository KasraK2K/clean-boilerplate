import { Request, Response } from "express"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { service } from "."
import { addMetaData } from "../../common/helpers/addMetaData"

export const shakeHand = async (req: Request, res: Response): IPromiseResponseObject => {
  return await service
    .shakeHand()
    .then((data) => {
      return addMetaData(res, data, { errCode: 1000, statusCode: 599 })
    })
    .catch((err) => addMetaData(res, {}, { errCode: err.code }))
}

export default {
  shakeHand,
}
