import { Request, Response, NextFunction } from "express"
import { addMetaData } from "../common/helpers/addMetaData.helper"

type FunctionNn = (args: any) => Promise<Record<string, any>>

class Controller {
  protected async handle(callback: FunctionNn, args: any, req: Request, res: Response, next: NextFunction) {
    return await callback((args !== undefined || args !== null) && args)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch(next)
  }
}

export default Controller
