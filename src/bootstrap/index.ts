//===============================================================================
//
//  #####    #####    #####   ######   ####  ######  #####      ###    #####
//  ##  ##  ##   ##  ##   ##    ##    ##       ##    ##  ##    ## ##   ##  ##
//  #####   ##   ##  ##   ##    ##     ###     ##    #####    ##   ##  #####
//  ##  ##  ##   ##  ##   ##    ##       ##    ##    ##  ##   #######  ##
//  #####    #####    #####     ##    ####     ##    ##   ##  ##   ##  ##
//
//===============================================================================

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: R E F L E C T   M E T A D A T A : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
import "reflect-metadata"
import "./extend"
import "./envirement"
import mongoClient from "./mongodb"
import postgresPool from "./postgresql"
import "./cron-jobs/index"

// starterConfig.boot.forEach(async (moduleName) => {
//   await import(`./${moduleName}`).catch((err) => console.log(err.message))

//   // ─── MONGODB ────────────────────────────────────────────────────────────────────
//   if (moduleName === "mongodb") {
//     mongoClient.connect((err) => {
//       if (err) {
//         console.error(err)
//         process.exit(1)
//       }
//     })
//   }
// })

export { mongoClient }
export { postgresPool }
