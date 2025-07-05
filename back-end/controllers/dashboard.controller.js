import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";

export const dashboardSummary = async (req, res) => {
  try {
    const incomes = await Income.find();
    const expenses = await Expense.find();

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    const currentMonth = new Date().getMonth();
    const monthlyExpense = expenses
      .filter((e) => new Date(e.date).getMonth() === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0);

    const recentIncomes = incomes.slice(-5).reverse();

    res.json({
      summary: {
        income: totalIncome,
        expenses: totalExpenses,
        monthlyExpense: monthlyExpense,
      },
      incomes: recentIncomes,
      expenses: expenses.slice(-5).reverse(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
};
