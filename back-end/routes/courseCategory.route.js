import express from "express";
import {
  category,
  deleteCat,
  getAllCat,
} from "../controllers/courseCategory.controller.js";

const router = express.Router();

router
  .post("/add-category", category)
  .get("/all-categories", getAllCat)
  .delete("/del-category/:id", deleteCat);

export default router;
