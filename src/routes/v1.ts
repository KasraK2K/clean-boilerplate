import express from "express"
import { routes as generalRoutes } from "../domains/general"
import { routes as userRoutes } from "../domains/user"

const router = express.Router()

router.use("/general", generalRoutes)
router.use("/user", userRoutes)

export default router
