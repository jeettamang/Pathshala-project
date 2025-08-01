import ExpenseCateModel from "../models/expense.categ.model.js";

export const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const categoryExists = await ExpenseCateModel.findOne({ name });
    if (categoryExists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const newCategory = new ExpenseCateModel({ name });
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
    const categories = await ExpenseCateModel.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch categories", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await ExpenseCateModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
