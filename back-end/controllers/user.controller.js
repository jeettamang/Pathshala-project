import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendInvoice from "../utils/sendInvoice.js";
import CourseModel from "../models/course.model.js";

//Add user
export const addUserController = async (req, res) => {
  try {
    const { name, email, password, course, payment } = req.body;
    if (!name || !email || !password || !course) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
        success: false,
      });
    }
    const selectedCourse = await CourseModel.findOne({ name: course });
    if (!selectedCourse) {
      return res.status(400).json({
        error: true,
        messsage: "Select the valid course",
        success: false,
      });
    }
    const totalFee = selectedCourse.fee;
    const remaining = totalFee - Number(payment);

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
        error: true,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      course,
      payment,
      remaining,
    });

    await sendInvoice({
      to: email,
      userName: name,
      courseName: course,
      amount: payment,
    });

    res.status(200).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in registration",

      error: error.message,
    });
  }
  console.log(error);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not found",
      error: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateData) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};
