import express from "express";
import { dashboardSummary } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/dashboard-summary", verifyToken, dashboardSummary);

export default router;
