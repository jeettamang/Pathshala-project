import BalanceModel from "../models/balance.model.js";

export const getBalance = async (req, res) => {
  try {
    const balance = await BalanceModel.findOne();
    if (!balance) {
      return res.status(401).json({
        message: "Balance not found",
      });
    }
    res.status(200).json({
      message: "Your available and deducted balance",
      balance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBalance = async (req, res) => {
  try {
    const { availableBalance, lastDeducted } = req.body;
    const updated = await BalanceModel.findOneAndUpdate(
      {},
      { availableBalance, lastDeducted },
      { new: true, upsert: true }
    );
    res.status(200).json({
      message: "Successfully updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
