//=======================================================================================================================================================
//
//   ####  #####  #####    ##   ##  #####  #####          ##  ##     ##  #####   #####   #####    ###    ###    ###    ######  ##   #####   ##     ##
//  ##     ##     ##  ##   ##   ##  ##     ##  ##         ##  ####   ##  ##     ##   ##  ##  ##   ## #  # ##   ## ##     ##    ##  ##   ##  ####   ##
//   ###   #####  #####    ##   ##  #####  #####          ##  ##  ## ##  #####  ##   ##  #####    ##  ##  ##  ##   ##    ##    ##  ##   ##  ##  ## ##
//     ##  ##     ##  ##    ## ##   ##     ##  ##         ##  ##    ###  ##     ##   ##  ##  ##   ##      ##  #######    ##    ##  ##   ##  ##    ###
//  ####   #####  ##   ##    ###    #####  ##   ##        ##  ##     ##  ##      #####   ##   ##  ##      ##  ##   ##    ##    ##   #####   ##     ##
//
//=======================================================================================================================================================

import os from "os"
import config from "config"
import { IApplicationConfig } from "../../../config/config.interface"
import logger from "./logger.helper"
import { ServiceName } from "../enums/general.enum"
import tokenHelper from "./token.helper"

const applicationConfig: IApplicationConfig = config.get("application")

export const getUserInformation = (port: number) => {
  if (applicationConfig.information) {
    console.group("Server Information:")
    console.table([
      {
        Port: port,
        NODE_ENV: process.env.NODE_ENV,
        Platform: os.platform(),
        "CPU Model": os.cpus()[0].model,
        Arch: os.arch(),
      },
    ])
    console.groupEnd()
    // CPU/Ram Information
    console.group("\nCPU/Ram Information:")
    console.table([
      {
        "CPU Count": os.cpus().length,
        "CPU Speed": os.cpus()[0].speed,
        "Total Memory": os.totalmem(),
        "Free Memory": os.freemem(),
        "Used Memory": os.totalmem() - os.freemem(),
      },
    ])
    console.groupEnd()
    // Node Information
    console.group("\nNode Information:")
    console.table([
      {
        "Node PID": process.pid,
        "Node CPU Usage": process.cpuUsage(),
        "Node Version": process.version,
        "Node Exec Path": process.execPath,
      },
    ])
    console.groupEnd()
  }

  const payload = { id: "9f57e79a-4534-4618-9e2a-f4d8711c1dcf" }
  const cypherToken = tokenHelper.sign({ id: "9f57e79a-4534-4618-9e2a-f4d8711c1dcf" })
  const cypherApiKey = tokenHelper.sign({ api_key: String(process.env.API_KEY) })

  console.log("\n- Cypher Token ----------------------------------------------------------")
  console.info(cypherToken)

  console.log("\n- Cypher Api Key ----------------------------------------------------------")
  console.info(cypherApiKey)

  logger.info(`Server running on http://localhost:${port}`, {
    service: ServiceName.DEFAULT,
    dest: "information.helper",
  })
}
