import express from "express";
import {
  category,
  deleteCat,
  getAllCat,
} from "../controllers/courseCategory.controller.js";

const router = express.Router();

router
  .post("/course/add-category", category)
  .get("/course/all-categories", getAllCat)
  .delete("/course/del-category/:id", deleteCat);

export default router;
