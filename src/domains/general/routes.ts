import express from "express"
import { controller } from "."

const router = express.Router()

router.get("/", controller.shakeHand)
router.get("/upload", controller.upload)

export default router
