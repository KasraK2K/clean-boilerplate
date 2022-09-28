import { Request, Response, NextFunction } from "express"
import _ from "lodash"
import config from "config"
import os from "os"
import fs from "fs"
import { resolve } from "path"
import formidable from "formidable"
import { IUploadConfig } from "../../config/config.interface"
import logger from "../common/helpers/logger.helper"
import { addMetaData } from "../common/helpers/addMetaData.helper"
import { error } from "../common/helpers/error.helper"
import Middleware from "./Middleware"

const uploadConfig: IUploadConfig = config.get("upload")

class MultipartMiddleware extends Middleware {
  public handle(req: Request, res: Response, next: NextFunction) {
    if ((req.headers["content-type"] ?? "").startsWith("multipart/form-data")) {
      const fileBeginDestination = resolve(process.cwd(), uploadConfig.uploadDir)

      const form = formidable({
        ...uploadConfig,
        uploadDir: uploadConfig.uploadDir === "tmp" ? os.tmpdir() : fileBeginDestination,
      })

      const checkUpload: Record<string, any> = { valid: true, errors: [] }

      /* ------------------------------ START: EVENTS ----------------------------- */
      form.on("fileBegin", (data) => {
        if (!fs.existsSync(fileBeginDestination)) fs.mkdirSync(fileBeginDestination, { recursive: true })
      }) // Create folder if it doesn't exist'

      form.on("error", (err) => {
        checkUpload.valid = false
        checkUpload.errors.push(error(1005).message)
        logger.error(err, { dest: "MultipartMiddleware.ts" })
      }) // Fill errors on get error and log with logger
      /* ------------------------------- END: EVENTS ------------------------------ */

      form.parse(req, (err: any, fields: formidable.Fields, files: formidable.Files) => {
        if (err) {
          logger.error(err, { dest: "MultipartMiddleware.ts" })
          checkUpload.valid = false
          checkUpload.errors.push(error(1004).message)
        }

        if (typeof files === "object" && !Array.isArray(files)) {
          const filesKeys = _.keys(files)
          const validMimetypes = ["image/jpg", "image/jpeg"]

          if (!("type" in fields) || !uploadConfig.validUploadFolders.includes(String(fields.type))) {
            checkUpload.valid = false
            checkUpload.errors.push(error(1007).message)
          }
          if ("id" in fields && !Number(fields.id)) {
            checkUpload.valid = false
            checkUpload.errors.push(error(1008).message)
          }
          if (filesKeys.length > uploadConfig.maxFiles) {
            checkUpload.valid = false
            checkUpload.errors.push(error(1009).message)
          }

          filesKeys.forEach((fileKey) => {
            const file = files[fileKey] as formidable.File
            const index = checkUpload.errors.length
            if (!validMimetypes.includes(String(file.mimetype))) {
              checkUpload.valid = false
              checkUpload.errors[index] = error(1006).message
            }
          })

          if (!checkUpload.valid) {
            filesKeys.forEach((fileKey) => {
              const file = files[fileKey] as formidable.File
              fs.unlinkSync(file.filepath)
            })
            logger.error("Error on uploading file", { dest: "MultipartMiddleware.ts" })
            return addMetaData(req, res, { errCode: 1005, statusCode: 400, errors: checkUpload.errors })
          }
        }

        _.assign(req.body, fields)
        _.assign(req.body, { files })

        next()
      })
    } else next()
  }
}

export default new MultipartMiddleware()
