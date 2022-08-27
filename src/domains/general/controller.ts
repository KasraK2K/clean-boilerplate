import { Request, Response } from "express"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { service } from "."

export const shakeHand = async (req: Request, res: Response): IPromiseResponseObject => {
  return res.json(await service.shakeHand())
}

export default {
  shakeHand,
}
