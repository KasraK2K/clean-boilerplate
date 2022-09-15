import express, { Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger"
import { addMetaData } from "./../common/helpers/addMetaData.helper"
import { routes as generalRoutes } from "../domains/general/general.module"
import { routes as userRoutes } from "../domains/user/user.module"

const swaggerOptions = {
  explorer: true,
  swaggerOptions: { validatorUrl: null },
}

const router = express.Router()

router.all("/health", (req: Request, res: Response) => addMetaData(req, res, {}))
router.use("/general", generalRoutes)
router.use("/user", userRoutes)

// Swagger
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

export default router
