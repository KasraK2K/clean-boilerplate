import express from "express";
import generalRoutes from "../domains/general";

const router = express.Router();

router.use("/general", generalRoutes);

export default router;
