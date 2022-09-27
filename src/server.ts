import config from "config"
import app from "./app"
import logger from "./common/helpers/logger.helper"
import { IApplicationConfig, IRedisIoConfig } from "./../config/config.interface"
import { getUserInformation } from "./common/helpers/information.helper"
import http from "http"

/* -------------------------------------------------------------------------- */
/*                                   BullMQ                                   */
/* -------------------------------------------------------------------------- */
// import { Job, Queue, Worker } from "bullmq"
// import IORedis from "ioredis"

// const ioRedisConfig: IRedisIoConfig = config.get("database.ioRedis")
// const connection = new IORedis(ioRedisConfig)

// const queue = new Queue("queueName", { connection })
// queue.add("jobName", { name: "Kasra", age: 36 }, { removeOnComplete: false })

// const worker = new Worker("queueName", async (job: Job) => console.log(job.data), { connection })

// worker.on("completed", (job) => console.log(`${job.id} has completed!`))
// worker.on("failed", (job, err) => console.log(`${job.id} has failed with ${err.message}`))
/* -------------------------------------------------------------------------- */

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
