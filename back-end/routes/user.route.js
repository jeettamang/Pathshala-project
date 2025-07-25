import express from "express";
import {
  addUserController,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router

  .post("/create", addUserController)
  .get("/get-all", getAllUsers)
  .delete("/delete/:id", deleteUser)
  .put("/update", updateUser)
  .get("/:id", getUserById);

export default router;
