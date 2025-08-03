import IncomeCategory from "../models/incomeCategory.model.js";

export const addIncomeCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const category = new IncomeCategory({ name });
    await category.save();

    res.status(201).json({
      message: "Income category is added",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

export const getIncomeCategories = async (req, res) => {
  try {
    const categories = await IncomeCategory.find();
    res.status(200).json({
      message: "All income categories",
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get categories", error });
  }
};

export const deleteIncomeCategory = async (req, res) => {
  try {
    await IncomeCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
