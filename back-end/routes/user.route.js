import express from "express";
import {
  addUserController,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router

  .post("/create", addUserController)
  .get("/get-all", getAllUsers)
  .delete("/delete/:id", deleteUser)
  .put("/update", updateUser);

export default router;
