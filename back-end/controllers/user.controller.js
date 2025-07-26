import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendInvoice from "../utils/sendInvoice.js";
import CourseModel from "../models/course.model.js";

//Add user
export const addUserController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      course,
      payment,
      completed = false,
      internshipStatus = false,
      certificate = "",
    } = req.body;

    if (!name || !email || !password || !course) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
        success: false,
      });
    }

    const selectedCourse = await CourseModel.findOne({
      name: { $regex: new RegExp(`^${course.trim()}$`, "i") },
    });
    if (!selectedCourse) {
      return res.status(400).json({
        error: true,
        message: "Select a valid course",
        success: false,
      });
    }

    const totalFee = selectedCourse.fee;

    // Validate payment
    const paymentNumber = Number(payment);
    if (isNaN(paymentNumber) || paymentNumber < 0) {
      return res.status(400).json({
        error: true,
        message: "Invalid payment amount",
        success: false,
      });
    }
    if (paymentNumber > totalFee) {
      return res.status(400).json({
        error: true,
        message: "Payment cannot exceed total course fee",
        success: false,
      });
    }

    const remaining = totalFee - paymentNumber;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
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
      payment: paymentNumber,
      remaining,
      courseDuration: selectedCourse.duration || "",
      completed,
      internship: {
        status: internshipStatus,
        certificate,
      },
    });

    await sendInvoice({
      to: email,
      userName: name,
      courseName: course,
      amount: paymentNumber,
    });

    return res.status(200).json({
      message: "User registered successfully",
      newUser,
      success: true,
    });
  } catch (error) {
    console.log("Registration Error:", error);
    return res.status(500).json({
      message: "Error in registration",
      error: error.message,
    });
  }
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
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
      success: false,
    });
  }
};
