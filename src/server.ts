import config from "config"
import app from "./app"
import logger from "./common/helpers/logger.helper"
import { IApplicationConfig } from "./../config/config.interface"
import { getUserInformation } from "./common/helpers/information.helper"
import http from "http"

const appConfig: IApplicationConfig = config.get("application")
const port: number = Number(process.env.PORT) || appConfig.port

// ─── UNHANDLED REJECTION ────────────────────────────────────────────────────────
process.on("unhandledRejection", (reason, p) => {
  logger.error(`Unhandled Rejection at: Promise ${p} Reson: ${reason}`, { dest: "server" })
})

// ─── UNCAUGHT EXCEPTION ─────────────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception error: ${err.message}`, { dest: "server" })
  process.exit(1)
})

/* -------------------------------------------------------------------------- */
/*                                   Starter                                  */
/* -------------------------------------------------------------------------- */
const httpServer = http.createServer(app)

async function starter() {
  await new Promise((resolve) => resolve(httpServer.listen({ port })))
} // ─────────────────────────────────────── Create Async Starter Function ─────

starter()
  .then(() => {
    logger.info(`🧿 Server running at http://localhost:${port}`)
    logger.info(`🎁 Access GraphQL in http://localhost:${port}/graphql`)
    getUserInformation(port)
  })
  .catch((error) => {
    logger.error(`Error on starter`)
  }) // ────────────────────────────────────────────── Start Server Engine ─────
