import express from "express";
import {
  addIncome,
  deleteIncome,
  getAllIncome,
} from "../controllers/income.controller.js";

const router = express.Router();

router
  .post("/add-income", addIncome)
  .get("/all-income", getAllIncome)
  .delete("/delete-income/:id", deleteIncome);

export default router;
