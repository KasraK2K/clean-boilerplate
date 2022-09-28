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
import logger from "../common/helpers/logger.helper"
import { ServiceName } from "../common/enums/general.enum"

const mongodbConfig: IMongodbConfig = config.get("database.mongodb")

const mongoClient: MongoClient = new MongoClient(mongodbConfig.uri)

mongoClient
  .on("connect", () => console.log("MongoDB connected"))
  .on("close", () => console.log("MongoDB connection closed"))
  .on("error", (err) => {
    logger.error(err.message, { service: ServiceName.DEFAULT, dest: "mongodb.ts" })
    process.exit(1)
  })

const mongo = {
  mongoClient,
  database: (databaseName = mongodbConfig.name) => mongoClient.db(databaseName),
  collection: (collectionName = mongodbConfig.default_collection) =>
    mongoClient.db(mongodbConfig.name).collection(collectionName),
}

export default mongo
