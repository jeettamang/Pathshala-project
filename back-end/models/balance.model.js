import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema(
  {
    availableBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    lastDeducted: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BalanceModel = mongoose.model("Balance", balanceSchema);
export default BalanceModel;
