import express from "express"
const router = express.Router()
import { controller } from "."

router.all("/shake-hand", controller.shakeHand)
router.post("/list", controller.getUserList)
router.post("/create", controller.addUser)

export default router
