// ─── PACKAGES ────────────────────────────────────────────────────────────────
import express from "express"
const router = express.Router()

// ─── MODULES ─────────────────────────────────────────────────────────────────
import { controller } from "./module"

router.post("/list", controller.list)
router.post("/profile", controller.profile)
router.post("/upsert", controller.upsert)
router.post("/archive", controller.archive)
router.post("/restore", controller.restore)
router.post("/toggle", controller.toggle)
router.post("/delete", controller.delete)

router.post("/auth/login", controller.login)
router.post("/auth/refresh-token", controller.refreshToken)
router.post("/auth/forgot-password", controller.forgotPassword)
router.post("/auth/reset-password", controller.resetPassword)

export default router
