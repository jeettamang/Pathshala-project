import express from "express";
import {
  isAdminController,
  loginController,
  registerAdmin,
} from "../controllers/admin.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { adminVerify } from "../utils/adminVerify.js";

const router = express.Router();

router
  .post("/register", verifyToken, isAdmin, registerAdmin)
  .post("/login", loginController)
  .get("/verify", adminVerify)
  .get("/profile", verifyToken, isAdmin, isAdminController);

export default router;
