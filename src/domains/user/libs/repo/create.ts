import { PrismaClient } from "@prisma/client"
import { IDefaultArgs } from "src/common/interfaces/repository.interface"
import logger from "../../../../common/helpers/logger.helper"

const prisma = new PrismaClient()

export const create = (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
  return new Promise(async (resolve, reject) => {
    const { name, email, posts_title, profile_bio } = args

    return await prisma.user
      .create({
        data: {
          email,
          name,
          posts: {
            create: { title: posts_title },
          },
          profile: {
            create: { bio: profile_bio },
          },
        },
      })
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

export default create
