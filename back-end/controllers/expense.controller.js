import ExpenseModel from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  let { amount, category, description, paymentMethod, date } = req.body;

  if (!amount || !category || !description || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const parsedAmount = Number(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  try {
    const newExpense = new ExpenseModel({
      amount: parsedAmount,
      description,
      category,
      paymentMethod,
      date,
      user: req.user.id,
    });

    await newExpense.save();

    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    console.error("Error in addExpense:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All Expenses", allExpenses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
