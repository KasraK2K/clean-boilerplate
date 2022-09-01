import amqp from "amqplib/callback_api"

const uri = "" + process.env.RBBITMQ_URI

export const producer = (message: Record<string, any> = {}, queue_name: string): void => {
  amqp.connect(uri, (error0, connection) => {
    if (error0) throw error0

    connection.createChannel((error1, channel) => {
      if (error1) throw error1

      /**
       * @argument {durable} This makes sure the queue is declared before attempting to consume from it
       */
      channel.assertQueue(queue_name, { durable: true })

      /**
       * @argument {persistent} Persistent messages will be written to disk as soon as they reach the queue,
       * while transient messages will be written to disk only so that they can be evicted from memory while under memory pressure
       */
      channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(message)), { persistent: true })
    })

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500)
  })
}
