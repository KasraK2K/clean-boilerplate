import express from "express"
const router = express.Router()
import { controller } from "./user.module"

router.post("/list", controller.getUserList)
router.post("/profile", controller.getUserProfile)
router.post("/create", controller.addUser)

export default router
