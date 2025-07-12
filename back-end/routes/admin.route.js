import express from "express";
import {
  isAdminController,
  loginController,
  registerAdmin,
} from "../controllers/admin.controller.js";
import { adminVerify } from "../controllers/adminVerify.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router
  .post("/create", registerAdmin)
  .post("/login", loginController)
  .get("/verify", adminVerify)
  .get("/profile", verifyToken, isAdmin, isAdminController);

export default router;
