import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
