import { Request, Response } from "express"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { service } from "."

export const getUserList = async (req: Request, res: Response): IPromiseResponseObject => {
  return res.json(await service.getUserList())
}

export default {
  getUserList,
}
