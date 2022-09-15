import express from "express"
import { controller } from "./general.module"

const router = express.Router()

router.all("/shake-hand", controller.shakeHand)
router.post("/user-list", controller.getUserList)
router.post("/upload", controller.upload)

export default router
