import express from "express"
import { controller } from "."

const router = express.Router()

router.get("/", controller.getUserList)

export default router
