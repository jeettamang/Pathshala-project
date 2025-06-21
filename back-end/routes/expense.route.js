import { expenseEntry } from "../controllers/expense.controller.js";
import express from "express";
const router = express.Router();

router.post("/expense", expenseEntry);

export default router;
