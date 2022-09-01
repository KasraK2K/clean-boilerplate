import express from "express"
import { controller } from "."

const router = express.Router()

router.post("/shake-hand", controller.shakeHand)
router.post("/user-list", controller.getUserList)
router.post("/upload", controller.upload)

export default router
