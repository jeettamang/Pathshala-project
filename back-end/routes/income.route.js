import express from "express";
import {
  addIncome,
  deleteIncome,
  getAllIncome,
} from "../controllers/income.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .post("/add-income", verifyToken, addIncome)
  .get("/all-income", verifyToken, getAllIncome)
  .delete("/delete-income/:id", verifyToken, deleteIncome);

export default router;
