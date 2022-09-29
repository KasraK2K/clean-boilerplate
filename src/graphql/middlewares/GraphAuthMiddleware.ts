import { Context } from "../context"
import { IDefaultArgs } from "../../common/interfaces/general.interface"
import error from "../../common/helpers/error.helper"

class GraphAuthMiddleware {
  // public isAuthenticated =
  //   (next: any) => async (root: string[], args: IDefaultArgs, context: Context, info: Record<string, any>) => {
  //     const tokenData = context.response.locals.tokenData
  //     const api_key = context.request.headers["api-key"]

  //     if (!tokenData) throw new Error(error(1011).message)
  //     else if (!api_key) throw new Error(error(1012).message)
  //     else if (api_key !== process.env.API_KEY) throw new Error(error(1013).message)
  //     else return next(root, args, context, info)
  //   }

  public async isAuthenticated(
    resolve: any,
    root: Record<string, any>,
    args: Record<string, any>,
    context: Context,
    info: Record<string, any>
  ) {
    const operationName = info.fieldNodes[0].selectionSet.selections[0].name.value
    const ignoreAthentication = ["login", "refreshToken", "forgotPassword", "resetPassword"]

    const api_key = context.request.headers["api-key"]
    if (!api_key) throw new Error(error(1012).message)

    if (!ignoreAthentication.includes(operationName)) {
      const tokenData = context.response.locals.tokenData
      if (!tokenData) throw new Error(error(1011).message)
      else if (api_key !== process.env.API_KEY) throw new Error(error(1013).message)
    }

    return await resolve(root, args, context, info)
  }
}

export default new GraphAuthMiddleware()
