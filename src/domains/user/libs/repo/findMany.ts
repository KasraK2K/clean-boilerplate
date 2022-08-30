import { PrismaClient } from "@prisma/client"
import { IDefaultArgs } from "src/common/interfaces/repository.interface"
import logger from "../../../../common/helpers/logger.helper"

const prisma = new PrismaClient()

export const findMany = (args: IDefaultArgs = {}): Promise<Record<string, any>[]> => {
  return new Promise(async (resolve, reject) => {
    return await prisma.user
      .findMany()
      .then(async (response) => {
        await prisma.$disconnect()
        return resolve(response)
      })
      .catch(async (err) => {
        logger.error(err.message, { service: "user", dest: "createUser" })
        await prisma.$disconnect()
        return reject(err)
      })
  })
}

export default findMany
