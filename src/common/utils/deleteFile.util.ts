import fs from "fs"
import { ServiceName } from "../enums/general.enum"
import logger from "../helpers/logger.helper"

interface IDeleteFile {
  service?: string
  dest?: string
}

export const deleteFile = (
  filePath: string,
  options: IDeleteFile = { service: ServiceName.DEFAULT, dest: "deleteFile.util" }
) => {
  const { service, dest } = options

  if (fs.existsSync(filePath)) {
    setImmediate(() => fs.unlinkSync(filePath))
    return true
  } else {
    logger.warn(`File path "${filePath}" does not exist so failed to unlink it`, { service, dest })
    return false
  }
}

export default deleteFile
