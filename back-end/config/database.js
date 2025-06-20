import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
  }
};
