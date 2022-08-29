import { IRedisConfig } from "./../../config/config.interface"
import { createClient } from "redis"
import config from "config"

const redisConfig: IRedisConfig = config.get("database.redis")

export const createRedisClient = async () => {
  const client = createClient({ url: redisConfig.uri })

  client
    .on("connect", () => console.log("Redis client connected"))
    .on("ready", () => console.log("Redis Client Ready"))
    .on("error", (err) => {
      if (err.code === "ECONNREFUSED") {
        console.error("Redis server refused the connection")
        process.exit(1)
      }
      console.error("Redis Client Error:", err)
    })
    .on("end", () => console.log("Redis client disconnected"))
    .on("reconnecting", () => console.log("Redis client reconnecting"))

  await client.connect()

  return client
}

export default { createRedisClient }

//============================================================================
// Now you can easily connect to the database from any point in your Node.js
//============================================================================
// (async () => {
//   const client = await createRedisClient();
//   await client.set("foo", "bar", { EX: 7 });
//   const baz = await client.get("foo");
//   console.log(baz);
// })();
//============================================================================
