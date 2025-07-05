import ExpenseModel from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const NewIncome = new ExpenseModel({
    title,
    amount,
    description,
    category,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    await NewIncome.save();
    res.status(200).json({
      message: "Expense added successful",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Server error",
      error,
    });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const allIncome = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All Expenses",
      allIncome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
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
      message: "Expense amount deleted successfully",
      deletedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Expense amount delete failed...",
      error: error.message,
    });
  }
};
