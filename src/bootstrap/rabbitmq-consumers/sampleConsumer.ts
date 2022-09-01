/* -------------------------------------------------------------------------- */
/*                             NOTE: Requirements                             */
/* -------------------------------------------------------------------------- */
/*                  This Consumer message should have a `id`                  */
/* -------------------------------------------------------------------------- */

import amqp from "amqplib/callback_api"
import config from "config"
import path from "path"
import { IJobsConfig } from "config/config.interface"
import logger from "../../common/helpers/logger.helper"

const jobConfig: IJobsConfig = config.get("job")

const filename = path.parse(__filename).name
const uri = process.env.RBBITMQ_URI
const queue_name = "sample-consumer-queue"

if (uri && uri.length && jobConfig.activeConsumers.includes(filename))
  amqp.connect(uri, (error0, connection) => {
    if (error0) throw error0

    connection.createChannel((error1, channel) => {
      if (error1) throw error1

      /**
       * @argument {durable} This makes sure the queue is declared before attempting to consume from it
       */
      channel.assertQueue(queue_name, { durable: true })

      /**
       * @param {prefetch} This tells RabbitMQ not to give more than one message to a worker at a time.
       * Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one.
       * Instead, it will dispatch it to the next worker that is not still busy.
       */
      channel.prefetch(1)

      logger.info(`Waiting for messages in ${queue_name}`, { dest: "sample-consumer" })

      channel.consume(
        queue_name,
        (message) => {
          if (message) {
            const content: Record<string, any> = JSON.parse(message.content.toString())

            // NOTE: You can do something here...

            logger.log(`Message id: ${content.id} Done`, { dest: "sample-consumer" })
            channel.ack(message)
          }
        },
        { noAck: false }
      )
    })
  })
