import { PrismaClient } from "@prisma/client"
import connect from "../domains/connect/connect.module"
import { postgresPool } from "../bootstrap"
import { Pool } from "pg"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  pg_pool: Pool
  connect: typeof connect
  tokenData: { id: number }
  request: Request
  response: Response
}

export const context: Context = {
  prisma,
  pg_pool: postgresPool.pool,
  connect,
  tokenData: {} as { id: number },
  request: {} as Request,
  response: {} as Response,
}
