import { IApplicationConfig } from "config/config.interface"
import { Request, Response } from "express"
import _ from "lodash"
import config from "config"
import error from "./error.helper"

interface IResponseData {
  api_version: string
  portal_vertion: string
  front_version: string
  endpoint: string
  env: string
  mode: string
  count: number
  result: Record<string, any>[]
  error: boolean
  error_code: number
  error_messages: string[]
}

const applicationConfig: IApplicationConfig = config.get("application")
const mode: string = config.get("mode")

const addErrCode = (
  res: Response,
  errCode: number | undefined,
  data: Record<string, any>,
  setMessage: boolean
): void => {
  if (errCode) {
    const errObj = error(errCode)
    res.status(errObj.status)
    data.error = true
    data.error_code = errObj.code
    !setMessage && (data.error_messages = [errObj.message])
  }
}

const addStatus = (
  res: Response,
  statusCode: number | undefined,
  data: Record<string, any>,
  setMessage: boolean
): void => {
  if (typeof statusCode === "string" || (statusCode && (statusCode > 599 || statusCode < 100))) {
    const errObj = error(1001)
    res.status(errObj.status)
    data.error = true
    data.error_code = errObj.code
    setMessage && (data.error_messages = [errObj.message])
  } else if (statusCode) {
    statusCode > 399 && (data.error = true)
    res.status(statusCode)
  }
}

const addCustomErrors = (res: Response, errors: string[] | undefined, data: Record<string, any>): void => {
  if (errors && errors.length) {
    const errObj = error(1002)
    data.error = true
    data.error_code = errObj.code
    data.error_messages = errors
    if (res.statusCode === 200) {
      errObj.status && res.status(errObj.status)
    }
  }
}

export const addMetaData = (
  req: Request,
  res: Response,
  args: {
    data?: Record<string, any> | Record<string, any>[]
    statusCode?: number
    errCode?: number
    errors?: string[]
  } = {}
): Response<IResponseData> => {
  const { data = [], statusCode, errCode, errors } = args
  const isDataArray = Array.isArray(data)

  const resData: IResponseData = {
    api_version: applicationConfig.api_version,
    front_version: applicationConfig.front_version,
    portal_vertion: applicationConfig.portal_version,
    endpoint: req.originalUrl,
    env: String(process.env.NODE_ENV),
    mode,
    count: isDataArray ? data.length : 0,
    error: false,
    error_code: 0,
    error_messages: [],
    result: isDataArray ? data : [data],
  }

  const setMessage = !!(errors && errors.length)
  addErrCode(res, setMessage ? 1002 : errCode, resData, setMessage)
  addStatus(res, statusCode, resData, setMessage)
  addCustomErrors(res, errors, resData)

  return res.json(resData)
}
