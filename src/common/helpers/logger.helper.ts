import { createLogger, transports, format } from "winston"
import fs from "fs"
import path from "path"
import config from "config"
import { ILoggerConfig } from "../../../config/config.interface"
import DailyRotateFile from "winston-daily-rotate-file"
import deleteFile from "../utils/deleteFile.util"

/* -------------------------------- Constants ------------------------------- */
const loggerConfig: ILoggerConfig = config.get("logger")

const dir = path.resolve(loggerConfig.winston.dirname)
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const logLevel = process.env.NODE_ENV === "development" ? "debug" : "warn"

const options = {
  ...loggerConfig.winston,
  dirname: dir,
}
/* -------------------------------------------------------------------------- */

/* -------------------------------- Error Log ------------------------------- */
let errorTransport: DailyRotateFile = {} as DailyRotateFile

if (loggerConfig.logOnFile) {
  errorTransport = new DailyRotateFile({
    level: "error",
    filename: "%DATE%__error",
    ...options,
  })

  // errorTransport.on("new", (newFilename) => console.log(`${newFilename} Created`))
  // errorTransport.on("archive", (zipFilename) => console.log(`${zipFilename} Archived`))
  errorTransport.on("rotate", (oldFilename) => deleteFile(oldFilename, { dest: "logger" }))
  // errorTransport.on("logRemoved", (removedFilename) => console.log(`${removedFilename} Removed`))
}
/* -------------------------------------------------------------------------- */

/* ------------------------------- Combine Log ------------------------------ */
let combinedTransport: DailyRotateFile = {} as DailyRotateFile

if (loggerConfig.logOnFile) {
  combinedTransport = new DailyRotateFile({
    filename: "%DATE%__combined",
    ...options,
  })

  // combinedTransport.on("new", (newFilename) => console.log(`${newFilename} Created`))
  // combinedTransport.on("archive", (zipFilename) => console.log(`${zipFilename} Archived`))
  combinedTransport.on("rotate", (oldFilename) => deleteFile(oldFilename, { dest: "logger" }))
  // combinedTransport.on("logRemoved", (removedFilename) => console.log(`${removedFilename} Removed`))
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
  transports: loggerConfig.logOnFile ? [errorTransport, combinedTransport] : [],
  // exceptionHandlers: any
  // rejectionHandlers: any
  exitOnError: false,
})
/* -------------------------------------------------------------------------- */

/* ----------------------------- Log on Console ----------------------------- */
if (loggerConfig.logOnConsole) {
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
