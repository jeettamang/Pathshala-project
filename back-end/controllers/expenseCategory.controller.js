import ExpenseCategoryModel from "../models/expenseCategory.model.js";

export const addCategory = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const categoryExists = await ExpenseCategoryModel.findOne({ name });
    if (categoryExists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const newCategory = await ExpenseCategoryModel.create({
      name,
    });
    await newCategory.save();
    res.status(201).json({ message: "Category added", category: newCategory });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding category", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await ExpenseCategoryModel.find().sort({
      createdAt: -1,
    });
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch categories", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await ExpenseCategoryModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
