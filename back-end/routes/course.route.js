import express from "express";
import { getAllCourses } from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/get-all", getAllCourses);

export default router;
