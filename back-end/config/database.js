import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import AdminModel from "../models/admin.model.js";

dotenv.config();

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully");

    const adminExist = await AdminModel.findOne({
      email: "jeettamang011@gmail.com",
    });

    if (adminExist) {
      console.log("Admin already exists");
    } else {
      const hashedPassword = bcrypt.hashSync("ADMIN122", 10);
      await AdminModel.create({
        name: "Jeet Tamang",
        email: "jeettamang011@gmail.com",
        password: hashedPassword,
        role: "super-admin",
      });
      console.log("Admin seeded successfully");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
