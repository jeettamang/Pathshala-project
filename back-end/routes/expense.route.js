import express from "express";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
} from "../controllers/expense.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .post("/add-expense", verifyToken, addExpense)
  .get("/all-expenses", getAllExpenses)
  .delete("/delete-expense/:id", deleteExpense);

export default router;
