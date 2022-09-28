import { Response } from "express"

export interface IResponseData {
  api_version: string
  portal_vertion: string
  front_version: string
  endpoint: string
  env: string
  mode: string
  count: number
  result: Record<string, any> | Record<string, any>[]
  error: boolean
  error_code: number
  error_messages: string[]
}

export type IControllerResponse = Promise<Response<IResponseData>>
