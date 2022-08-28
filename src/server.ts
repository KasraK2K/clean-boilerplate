import app from "./app"
import logger from "./common/helpers/logger"
import { IApplicationConfig } from "./../config/config.interface"
import config from "config"

const appConfig: IApplicationConfig = config.get("application")
const port: number = Number(process.env.PORT) || appConfig.port

app
  .listen(port, () => {
    logger.info(`Server running on port ${port}`)
  })
  .on("error", (error) => logger.error(error))
