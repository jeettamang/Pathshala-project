import mongoose from "mongoose";

const incomeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const IncomeCategory = mongoose.model("IncomeCategory", incomeCategorySchema);
export default IncomeCategory;
