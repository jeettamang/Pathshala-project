import express from "express";
import {
  loginController,
  registerAdmin,
} from "../controllers/admin.controller.js";
import { adminVerify } from "../controllers/adminVerify.js";

const router = express.Router();

router
  .post("/create", registerAdmin)
  .post("/login", loginController)
  .get("/verify", adminVerify);

export default router;
