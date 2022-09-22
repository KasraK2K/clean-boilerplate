import express from "express"
const router = express.Router()
import { controller } from "./module"

router.post("/list", controller.list)
router.post("/profile", controller.profile)
router.post("/upsert", controller.upsertEntity)
router.post("/archive", controller.archiveEntity)
router.post("/restore", controller.restoreEntity)
router.post("/delete", controller.deleteEntity)

export default router
