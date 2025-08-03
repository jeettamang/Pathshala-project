import express from "express";
import {
  addIncomeCategory,
  deleteIncomeCategory,
  getIncomeCategories,
} from "../controllers/incomeCategory.controller.js";

const router = express.Router();

router
  .post("/add-category", addIncomeCategory)
  .get("/all-categories", getIncomeCategories)
  .delete("/delete/:id", deleteIncomeCategory);

export default router;
