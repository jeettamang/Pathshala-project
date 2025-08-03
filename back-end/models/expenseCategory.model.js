import mongoose from "mongoose";
const expenseCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseCategoryModel = mongoose.model(
  "ExpenseCategory",
  expenseCategorySchema
);

export default ExpenseCategoryModel;
