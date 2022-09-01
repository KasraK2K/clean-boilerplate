import amqp from "amqplib/callback_api"
import { Ack } from ".."
// import PubSub from './PubSub'
// import Rpc from './Rpc'

class RabbitMQ {
  constructor(public uri: string = String(process.env.RBBITMQ_URI)) {}

  public amqp = amqp
  public ack = new Ack(this)
}

export default RabbitMQ
