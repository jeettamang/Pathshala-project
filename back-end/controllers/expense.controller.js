import expenseModel from "../models/expense.model.js";

export const expenseEntry = async (req, res) => {
  try {
    const { date, category, description, amount, paymentMethod } = req.body;
    if (!date || !category || !description || !amount || !paymentMethod) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
        success: false,
      });
    }
    const newExpense = await expenseModel.create({
      date,
      category,
      description,
      amount,
      paymentMethod,
    });
    res.status(200).json({
      error: false,
      success: true,
      message: "Expense created sucessfully",
      data: newExpense,
    });
  } catch (error) {
    console.error("error occured during expense entry", error);
    res.status(500).json({
      error: true,
      success: false,
      message: "Expense server error",
    });
  }
};
