import { IPostgresConfig } from "../../config/config.interface"
import pg from "pg"
import config from "config"

const pgConfig: IPostgresConfig = config.get("database.postgres")

// ─────────────────────────────────────────────────────── POSTGRES MAIN POOL ─────
const pool: pg.Pool = new pg.Pool({
  user: pgConfig.user,
  host: pgConfig.host,
  database: pgConfig.database,
  password: pgConfig.password,
  port: pgConfig.port,
  idleTimeoutMillis: pgConfig.idleTimeoutMillis,
  connectionTimeoutMillis: pgConfig.connectionTimeoutMillis,
})

pool
  .on("connect", () => console.log("Main postgres connected"))
  .on("remove", () => console.log("Main postgres connection closed"))
  .on("error", (err) => {
    console.log("PSQL Error Main")
    console.error(err)
    process.exit(1)
  })

export default {
  pool,
}
