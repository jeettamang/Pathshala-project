import express from "express";
import {
  loginController,
  registerAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/create", registerAdmin).post("/login", loginController);

export default router;
