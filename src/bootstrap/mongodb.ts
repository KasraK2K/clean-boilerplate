//======================================================================
//
//  ###    ###   #####   ##     ##   ####     #####   ####    #####
//  ## #  # ##  ##   ##  ####   ##  ##       ##   ##  ##  ##  ##  ##
//  ##  ##  ##  ##   ##  ##  ## ##  ##  ###  ##   ##  ##  ##  #####
//  ##      ##  ##   ##  ##    ###  ##   ##  ##   ##  ##  ##  ##  ##
//  ##      ##   #####   ##     ##   ####     #####   ####    #####
//
//======================================================================

import { MongoClient } from "mongodb"
import config from "config"
import { IMongodbConfig } from "../../config/config.interface"

const mongodbConfig: IMongodbConfig = config.get("database.mongodb")

const mongoClient: MongoClient = new MongoClient(mongodbConfig.uri)

mongoClient
  .on("connect", () => console.log("MongoDB connected"))
  .on("close", () => console.log("MongoDB connection closed"))
  .on("error", (err) => {
    console.log("MongoDB Error")
    console.error(err)
    process.exit(1)
  })

export default mongoClient
