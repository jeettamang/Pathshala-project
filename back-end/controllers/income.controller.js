import IncomeModel from "../models/income.model.js";

export const addIncome = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const income = new IncomeModel({
      amount,
      description,
      category,
      date,
    });

    await income.save();

    res.status(200).json({
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    console.error("Error in addIncome:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllIncome = async (req, res) => {
  try {
    const allIncome = await IncomeModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All incomes",
      allIncome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const deleteIncome = async (req, res) => {
  const incomeId = req.params.id;

  try {
    const deletedIncome = await IncomeModel.findByIdAndDelete(incomeId);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({
      message: "Amount deleted successfully",
      deletedIncome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Amount delete failed...",
      error: error.message,
    });
  }
};
