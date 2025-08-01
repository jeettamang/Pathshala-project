import mongoose, { Schema } from "mongoose";

const expenseCateSchema = new Schema(
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
const ExpenseCateModel = mongoose.model("ExpenseCategory", expenseCateSchema);
export default ExpenseCateModel;
