import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../controllers/expense.cate.controller.js";
const router = express.Router();

router
  .post("/add-category", addCategory)
  .get("/all-categories", getCategories)
  .delete("/delete-category/:id", deleteCategory);

export default router;
