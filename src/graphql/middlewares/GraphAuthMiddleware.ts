import { Context } from "../context"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import error from "../../common/helpers/error.helper"

class GraphAuthMiddleware {
  public isAuthenticated =
    (next: any) => async (root: string[], args: IDefaultArgs, context: Context, info: Record<string, any>) => {
      const tokenData = context.response.locals.tokenData
      const api_key = context.request.headers["api-key"]

      if (!tokenData) throw new Error(error(1011).message)
      else if (!api_key) throw new Error(error(1012).message)
      else if (api_key !== process.env.API_KEY) throw new Error(error(1013).message)
      else return next(root, args, context, info)
    }
}

export default new GraphAuthMiddleware()
