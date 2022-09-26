import express from "express"
const router = express.Router()
import { controller } from "./module"

router.post("/list", controller.list)
router.post("/profile", controller.profile)
router.post("/upsert", controller.upsert)
router.post("/archive", controller.archive)
router.post("/restore", controller.restore)
router.post("/toggle", controller.toggle)
router.post("/delete", controller.delete)

export default router
