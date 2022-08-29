import { Request, Response } from "express"
import { service } from "."
import { addMetaData } from "../../common/helpers/addMetaData"

export const shakeHand = async (req: Request, res: Response): Promise<Record<string, any>> => {
  return await service
    .shakeHand()
    .then((result) => addMetaData(req, res, { ...result }))
    .catch((err) => addMetaData(req, res, { errCode: err.code }))
}

export default {
  shakeHand,
}
