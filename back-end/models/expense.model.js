import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,

      trim: true,
    },
    type: {
      type: String,
      defaulf: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,

      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseModel = mongoose.model("Expense", expenseSchema);

export default ExpenseModel;
