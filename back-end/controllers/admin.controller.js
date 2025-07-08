import AdminModel from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Admin register
export const registerAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(402).json({
        message: "All fields are required",
      });
    }
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        error: true,
        message: "Admin already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.status(200).json({
      message: "Admin registered successfully",
      newAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: "Admin registration failed...",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Email and Password are required",
        success: false,
      });
    }
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      error: false,
      message: "User Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Error in Login",
      success: false,
    });
  }
};
