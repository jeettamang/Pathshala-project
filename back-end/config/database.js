import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import AdminModel from "../models/admin.model.js";
import CourseModel from "../models/course.model.js";

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
    const courses = [
      { name: "Python with django", duration: "2.5 month", fee: 7000 },
      { name: "MERN Stack", duration: "3 month", fee: 15000 },
      { name: "UI/UX Design", duration: "2 month", fee: 5000 },
      { name: "Digital Marketing", duration: "3 month", fee: 6000 },
      { name: "Nextjs", duration: "1.5 month", fee: 5000 },
      { name: "Reackjs", duration: "1.5 month", fee: 5000 },
      { name: "Nodejs", duration: "1.5 month", fee: 5000 },
    ];
    const existingCourse = await CourseModel.find();
    if (existingCourse.length === 0) {
      await CourseModel.insertMany(courses);
      console.log("Course seeded successfully");
    } else {
      console.log("Course already exist");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
