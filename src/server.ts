import config from "config"
import app from "./app"
import logger from "./common/helpers/logger.helper"
import { IApplicationConfig } from "./../config/config.interface"
import { getUserInformation } from "./common/helpers/information.helper"
import http from "http"
import BullMQ, { Job, Worker } from "./integrations/bullmq"

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: B U L L M Q   E X A M P L E : :  :   :    :      :         :            :
// ──────────────────────────────────────────────────────────────────────────────────
;(async () => {
  const bullmq = new BullMQ("queueName")
  const connection = bullmq.connection
  const queue = bullmq.queue

  // ─── Create Job ─────────────────────────────────────────────────────────────────
  // bullmq.job.create(
  //   "job-order-4",
  //   { name: "clean-boilerplate", is_old: false },
  //   { delay: 5000, removeOnComplete: true }
  // )

  // ─── Get Job ────────────────────────────────────────────────────────────────────
  // const job = await bullmq.job.getJob("job-order-10")
  // console.log(job)

  // ─── Renew Job ──────────────────────────────────────────────────────────────────
  // await bullmq.job.renewJob("job-order-4", { opts: { delay: 0 } })

  // ─── Create Worker ──────────────────────────────────────────────────────────────
  const worker = new Worker("queueName", async (job: Job) => console.log(job.data), { connection })
  worker.on("completed", (job) => console.log(`${job.id} has completed!`))
  worker.on("failed", (job, err) => console.log(`${job.id} has failed with ${err.message}`))
})()
// ─────────────────────────────────────────────────────── End Bullmq Example ─────

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
