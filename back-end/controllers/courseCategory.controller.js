import CourseCategoryModel from "../models/coursesCategory.model.js";

const category = async (req, res) => {
  const { name, fee, duration } = req.body;

  try {
    if (!name || !fee || !duration) {
      return res.status(400).json({
        message: "Name, fee and duration are required",
      });
    }
    const existCat = await CourseCategoryModel.findOne({ name });
    if (existCat) {
      return res.status(400).json({
        message: "Category already exist",
      });
    }
    const addCat = await CourseCategoryModel.create({
      name,
      fee,
      duration,
    });
    res.status(200).json({
      message: "Category created successfully",
      addCat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create category",
      error: error.message,
    });
  }
};

const getAllCat = async (req, res) => {
  try {
    const categories = await CourseCategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get categories", error: error.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    const { id } = req.params;
    const delCat = await CourseCategoryModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Category deleted successful",
      delCat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
    });
  }
};

export { category, getAllCat, deleteCat };
