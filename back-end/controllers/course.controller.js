import CourseModel from "../models/course.model.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All courses fethced",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};
