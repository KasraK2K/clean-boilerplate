import { createLogger, transports, format } from "winston"
import fs from "fs"
import path from "path"
import config from "config"
import { IApplicationConfig } from "../../config/config.interface"
import DailyRotateFile from "winston-daily-rotate-file"

/* -------------------------------- Constants ------------------------------- */
const appConfig: IApplicationConfig = config.get("application")

const dir = process.env.LOG_DIR || path.resolve("logs")
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const logLevel = process.env.NODE_ENV === "development" ? "debug" : "warn"

const options = {
  dirname: dir,
  datePattern: "YYYY-MM-DD",
  extension: ".log",
  zippedArchive: true,
  maxSize: "1k",
  maxFiles: "1d",
}
/* -------------------------------------------------------------------------- */

/* -------------------------------- Error Log ------------------------------- */
let errorTransport: DailyRotateFile = {} as DailyRotateFile

if (appConfig.logger.logOnFile) {
  errorTransport = new DailyRotateFile({
    level: "error",
    filename: "%DATE%__error",
    ...options,
  })

  errorTransport.on("new", (newFilename) => console.log(`${newFilename} Created`))
  errorTransport.on("archive", (zipFilename) => console.log(`${zipFilename} Archived`))
  errorTransport.on(
    "rotate",
    (oldFilename) => fs.existsSync(oldFilename) && setImmediate(() => fs.unlinkSync(oldFilename))
  )
  errorTransport.on("logRemoved", (removedFilename) => console.log(`${removedFilename} Removed`))
}
/* -------------------------------------------------------------------------- */

/* ------------------------------- Combine Log ------------------------------ */
let combinedTransport: DailyRotateFile = {} as DailyRotateFile

if (appConfig.logger.logOnFile) {
  combinedTransport = new DailyRotateFile({
    filename: "%DATE%__combined",
    ...options,
  })

  combinedTransport.on("new", (newFilename) => console.log(`${newFilename} Created`))
  combinedTransport.on("archive", (zipFilename) => console.log(`${zipFilename} Archived`))
  combinedTransport.on(
    "rotate",
    (oldFilename) => fs.existsSync(oldFilename) && setImmediate(() => fs.unlinkSync(oldFilename))
  )
  combinedTransport.on("logRemoved", (removedFilename) => console.log(`${removedFilename} Removed`))
}
/* -------------------------------------------------------------------------- */

/* -------------------------------- Formatter ------------------------------- */
const jsonLogFileFormat =
  process.env.NODE_ENV !== "production"
    ? format.combine(format.errors({ stack: true }), format.timestamp(), format.prettyPrint())
    : format.combine(format.errors({ stack: true }), format.timestamp(), format.json())
/* -------------------------------------------------------------------------- */

/* ------------------------------ Create Logger ----------------------------- */
const logger = createLogger({
  level: logLevel,
  format: jsonLogFileFormat,
  defaultMeta: { service: "default-service" },
  transports: appConfig.logger.logOnFile ? [errorTransport, combinedTransport] : [],
  // exceptionHandlers: any
  // rejectionHandlers: any
  exitOnError: false,
})
/* -------------------------------------------------------------------------- */

/* ----------------------------- Log on Console ----------------------------- */
if (appConfig.logger.logOnConsole) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) => {
          if (stack) return `${timestamp} ${level}: ${message} - ${stack}`
          else return `${timestamp} ${level}: ${message}`
        })
      ),
    })
  )
}
/* -------------------------------------------------------------------------- */

export default logger
