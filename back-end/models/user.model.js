import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    course: {
      type: String,
    },
    payment: {
      type: Number,
      default: 0,
    },
    remaining: {
      type: Number,
      default: 0,
    },
    courseDuration: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    internship: {
      status: {
        type: Boolean,
        default: false,
      },
      certificate: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
