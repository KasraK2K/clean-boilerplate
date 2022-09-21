import express from "express"
const router = express.Router()
import { controller } from "./user.module"

router.post("/list", controller.getUserList)
router.post("/profile", controller.getUserProfile)
router.post("/upsert", controller.upsertUser)
router.post("/archive", controller.archiveUser)
router.post("/restore", controller.restoreUser)
router.post("/delete", controller.deleteUser)

export default router
