import app from "./app"
import logger from "./common/helpers/logger.helper"
import { IApplicationConfig } from "./../config/config.interface"
import config from "config"
import { getUserInformation } from "./common/helpers/information.helper"

/* -------------------------------------------------------------------------- */
/*                                  RabbitMQ                                  */
/* -------------------------------------------------------------------------- */
// import rabbitMQ from "./integrations/rabbitmq"
// const callback = async (message: string) => {
//   console.log(`this is callback message: ${message}`)
// }
// const queue_name = "rabbitmq_starter_queue"
// rabbitMQ.ack.consumer(callback, queue_name)
/* -------------------------------------------------------------------------- */

const appConfig: IApplicationConfig = config.get("application")
const port: number = Number(process.env.PORT) || appConfig.port

app
  .listen(port, () => {
    logger.info(`Server running on port ${port}`, { dest: "server" })
    getUserInformation(port)
  })
  .on("error", (error) => logger.error(error))

// ─── UNHANDLED REJECTION ────────────────────────────────────────────────────────
process.on("unhandledRejection", (reason, p) => {
  logger.error(`Unhandled Rejection at: Promise ${p} Reson: ${reason}`, { dest: "server" })
})

// ─── UNCAUGHT EXCEPTION ─────────────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception error: ${err.message}`, { dest: "server" })
  process.exit(1)
})
