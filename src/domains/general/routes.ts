import express from "express"
import { controller } from "./module"

const router = express.Router()

router.post("/user-list", controller.userList)
router.post("/upload", controller.upload)

export default router
