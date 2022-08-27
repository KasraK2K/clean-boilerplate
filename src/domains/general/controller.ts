import { Request, Response } from "express"
import { IPromiseResponseObject } from "../../common/interfaces/response"
import { service, external } from "."

export const shakeHand = async (req: Request, res: Response): IPromiseResponseObject => {
  const userList = await external.userDomain
    .getUserList()
    .then((response) => response.result)
    .catch((err) => err)
  return res.json(userList)
}

export default {
  shakeHand,
}
