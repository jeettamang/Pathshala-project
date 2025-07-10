import CategoryModel from "../models/category.model.js";

const category = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }
    const existCat = await CategoryModel.findOne({ name });
    if (existCat) {
      return res.status(400).json({
        message: "Category already exist",
      });
    }
    const addCat = await CategoryModel.create({
      name,
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
    const categories = await CategoryModel.find();
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
    const delCat = await CategoryModel.findByIdAndDelete(id);
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
