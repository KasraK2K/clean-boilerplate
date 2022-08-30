import express from "express"
import { controller } from "."

const router = express.Router()

router.get("/shake-hand", controller.shakeHand)
router.post("/list", controller.getUserList)
router.post("/create", controller.addUser)

export default router
