import { Response } from "express"
import _ from "lodash"
import error from "./error"

interface IResponseData {
  api_version: string
  portal_version: string
  front_version: string
  result: Record<string, any>[]
  error: boolean
  error_messages: string[]
}

const addErrCode = (res: Response, errCode: number | undefined, data: Record<string, any>, setMessage: boolean): void => {
  if (errCode) {
    const errObj = error(errCode ?? 1000)
    res.status(errObj.status)
    data.error = true
    setMessage && (data.error_messages = [errObj.message])
  }
}

const addStatus = (res: Response, statusCode: number | undefined, data: Record<string, any>, setMessage: boolean): void => {
  if (typeof statusCode === "string" || (statusCode && (statusCode > 599 || statusCode < 100))) {
    const errObj = error(1001)
    res.status(errObj.status)
    data.error = true
    setMessage && (data.error_messages = [errObj.message])
  }
  else if (statusCode) {
    statusCode > 399 && (data.error = true)
    res.status(statusCode)
  }
}

const addCustomErrors = (res: Response, errors: string[] | undefined, data: Record<string, any>): void => {
  if (errors && errors.length) {
    data.error = true
    data.error_messages = errors
    if (res.statusCode === 200) {
      const errObj = error(1002)
      errObj.status && res.status(errObj.status)
    }
  }
}

export const addMetaData = (
  res: Response,
  data: Record<string, any> | Record<string, any>[],
  options: {
    statusCode?: number
    errCode?: number
    errors?: string[]
  } = {}
): Response<IResponseData> => {
  const { statusCode, errCode, errors } = options

  const resData: IResponseData = {
    api_version: "0.0.1",
    portal_version: "0.0.1",
    front_version: "0.0.1",
    result: Array.isArray(data) ? data : [data],
    error: false,
    error_messages: [],
  }

  const setMessage = !(errors && errors.length)
  addErrCode(res, setMessage ? 1002 : errCode, resData, setMessage)
  addStatus(res, statusCode, resData, setMessage)
  addCustomErrors(res, errors, resData)

  return res.json(resData)
}