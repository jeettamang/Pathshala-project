import express from "express";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
} from "../controllers/expense.controller.js";

const router = express.Router();

router
  .post("/add-expense", addExpense)
  .get("/all-expenses", getAllExpenses)
  .delete("/delete-expense/:id", deleteExpense);

export default router;
