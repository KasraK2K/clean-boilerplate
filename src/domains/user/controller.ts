import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData"
import { service } from "."

export const getUserList = async (req: Request, res: Response): Promise<Record<string, any>> => {
  return await service
    .getUserList()
    .then(result => addMetaData(req, res, { ...result }))
    .catch(err => addMetaData(req, res, { errCode: err.code }))
}

export default {
  getUserList,
}
