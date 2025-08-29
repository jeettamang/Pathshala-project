import UserModel from "../models/user.model.js";
import { hashedPassword } from "../utils/bcrypt.js";
import sendInvoice from "../utils/sendInvoice.js";
import CourseCategoryModel from "../models/coursesCategory.model.js";

//Add user
export const addUserController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      payment,
      course, // add course
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

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }

    const selectedCourse = await CourseCategoryModel.findOne({ name: course });
    if (!selectedCourse) {
      return res.status(400).json({
        message: "Selected course not found",
        success: false,
      });
    }

    const courseFee = selectedCourse.fee;
    const paymentNumber = Number(payment);

    if (
      isNaN(paymentNumber) ||
      paymentNumber < 0 ||
      paymentNumber > courseFee
    ) {
      return res.status(400).json({
        message: `Payment must be a number between 0 and Rs. ${courseFee}`,
        success: false,
      });
    }

    const hashedPass = hashedPassword(password);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPass,
      course,
      payment: paymentNumber,
      remaining: courseFee - paymentNumber,
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
