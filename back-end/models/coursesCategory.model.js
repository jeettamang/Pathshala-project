import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const CourseCategoryModel = mongoose.model("CourseCategory", coursesSchema);
export default CourseCategoryModel;
