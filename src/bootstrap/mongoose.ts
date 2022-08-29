//=============================================================================
//
//  ###    ###   #####   ##     ##   ####     #####    #####    ####  #####
//  ## #  # ##  ##   ##  ####   ##  ##       ##   ##  ##   ##  ##     ##
//  ##  ##  ##  ##   ##  ##  ## ##  ##  ###  ##   ##  ##   ##   ###   #####
//  ##      ##  ##   ##  ##    ###  ##   ##  ##   ##  ##   ##     ##  ##
//  ##      ##   #####   ##     ##   ####     #####    #####   ####   #####
//
//=============================================================================

import mongoose from "mongoose"
import config from "config"
import { IMongodbConfig } from "../../config/config.interface"

const mongodbConfig: IMongodbConfig = config.get("database.mongodb")

export const connection = mongoose.createConnection(mongodbConfig.uri)

//============================================================================
// Now you can easily connect to the database from any point in your Node.js
//============================================================================
// const Schema = new mongoose.Schema({ name: String });
// const userModel = connection.model("User", Schema);
// userModel.create({ name: "Kasra" });
//============================================================================
