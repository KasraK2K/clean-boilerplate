import { RabbitMQ } from ".."

class Ack {
  constructor(private superThis: RabbitMQ) {}

  consumer(
    callback: (content: any) => Promise<any>,
    options: { queue: string; durable?: boolean; noAck?: boolean; prefetch?: number }
  ): void {
    const { queue, durable = true, noAck = false, prefetch = 1 } = options

    this.superThis.amqp.connect(this.superThis.uri, (error0, connection) => {
      if (error0) throw error0

      connection.createChannel((error1, channel) => {
        if (error1) throw error1

        /**
         * @argument {durable} This makes sure the queue is declared before attempting to consume from it
         */
        channel.assertQueue(queue, { durable })

        /**
         * @param {prefetch} This tells RabbitMQ not to give more than one message to a worker at a time.
         * Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one.
         * Instead, it will dispatch it to the next worker that is not still busy.
         */
        channel.prefetch(prefetch)

        console.log("Waiting for messages in %s. To exit press CTRL+C", queue)

        channel.consume(
          queue,
          (message) => {
            if (message) {
              const content = JSON.parse(message.content.toString())
              callback(content)
                .then(() => channel.ack(message))
                .catch((error) => console.log(error.message))
            }
          },
          { noAck }
        )
      })
    })
  }

  producer(message: Record<string, any>, options: { queue: string; closeConnectionAfter?: number }): void {
    const { queue, closeConnectionAfter = 500 } = options

    this.superThis.amqp.connect(this.superThis.uri, (error0, connection) => {
      if (error0) throw error0

      connection.createChannel((error1, channel) => {
        if (error1) throw error1

        /**
         * @argument {durable} This makes sure the queue is declared before attempting to consume from it
         */
        channel.assertQueue(queue, { durable: true })

        /**
         * @argument {persistent} Persistent messages will be written to disk as soon as they reach the queue,
         * while transient messages will be written to disk only so that they can be evicted from memory while under memory pressure
         */
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true })
      })

      setTimeout(() => connection.close(), closeConnectionAfter)
    })
  }
}

export default Ack
