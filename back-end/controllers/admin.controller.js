import AdminModel from "../models/admin.model.js";
import { comparehashed, hashedPassword } from "../utils/bcrypt.js";
import { genToken } from "../utils/token.js";

//Admin register
export const registerAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("User from token at /register:", req.user);
  try {
    const adminAccess = req.user;
    if (!adminAccess || adminAccess.role !== "super-admin") {
      return res.status(400).json({
        message: "Only admin can register new admin",
      });
    }
    if (!name || !email || !password) {
      return res.status(400).json({
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
    const hashedPass = hashedPassword(password);
    const newAdmin = await AdminModel.create({
      name,
      email,
      password: hashedPass,
      role: "super-admin",
    });

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
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        error: true,
        message: "Admin not found",
        success: false,
      });
    }
    const isMatch = comparehashed(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: "Invalid password",
        success: false,
      });
    }

    const token = genToken(admin);

    return res.status(200).json({
      error: false,
      message: "User Login successful",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error("LoginController error:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Error in Login",
      success: false,
    });
  }
};

export const isAdminController = async (req, res) => {
  try {
    console.log("User from token:", req.user);
    const admin = await AdminModel.findById(req.user.id).select(
      "name email role"
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ admin });
  } catch (error) {
    console.error("Error checking admin:", error);
    return res.status(500).json({
      message: "Server error while checking admin",
      error: error.message,
    });
  }
};
