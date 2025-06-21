import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electricity", "Water", "Salary", "Rent", "Maintenance", "Misc"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["Esewa", "Khalti", "Bank transfer", "Cash"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const expenseModel = mongoose.model("Expense", expenseSchema);
export default expenseModel;
