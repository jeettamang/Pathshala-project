import express from "express";
import {
  getBalance,
  updateBalance,
} from "../controllers/balance.controller.js";
const router = express.Router();

router.get("/get-balance", getBalance);
router.put("/update-balance", updateBalance);

export default router;
