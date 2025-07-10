import ExpenseModel from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  const { amount, category, description, paymentMethod, date } = req.body;

  if (!category || !description || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  try {
    const newExpense = await ExpenseModel({
      amount,
      description,
      category,
      paymentMethod,
      date,
    });

    res.status(200).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All Expenses", allExpenses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    const deletedExpense = await ExpenseModel.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      deletedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Expense deletion failed",
      error: error.message,
    });
  }
};
