import IORedis from "ioredis"
import config from "config"
import { IRedisIoConfig } from "./../../../../config/config.interface"
import { Jobs, Queue } from ".."

const ioRedisConfig: IRedisIoConfig = config.get("database.ioRedis")
const connection = new IORedis(ioRedisConfig)

class BullMQ {
  public queue: Queue<any, any, string>

  constructor(private queueName: string) {
    this.queue = new Queue(this.queueName, { connection })
  }

  public connection = connection
  public job = new Jobs(this)
}

export default BullMQ
