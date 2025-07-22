import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
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

const IncomeModel = mongoose.model("Income", incomeSchema);

export default IncomeModel;
