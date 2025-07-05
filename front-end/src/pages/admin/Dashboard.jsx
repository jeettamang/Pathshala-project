import { useEffect, useState } from "react";
import SummaryCards from "../../components/SummaryCards";
import instance from "../../utils/axios";
import { URLS } from "../../constants/apiRoute";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    monthlyExpense: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await instance.get(URLS.GET_DASHBOARD);
        setSummary(res.data.summary);
        setExpenses(res.data.expenses);
        setIncomes(res.data.incomes);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCards
          label="Total Income"
          amount={summary.income}
          color="bg-green-100"
        />
        <SummaryCards
          label="Total Expenses"
          amount={summary.expenses}
          color="bg-red-100"
        />
        <SummaryCards
          label="Available Balance"
          amount={summary.income - summary.expenses}
          color="bg-blue-100"
        />
        <SummaryCards
          label="This Month"
          amount={summary.monthlyExpense}
          color="bg-yellow-100"
        />
      </div>

      {/* Expenses Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Income</h2>
        <table className="w-full text-sm text-left py-2 my-2">
          <thead className="bg-green-100">
            <tr>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income._id} className="border-b">
                <td className="py-2 px-3">
                  {new Date(income.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-3">{income.category}</td>
                <td className="py-2 px-3">Rs{income.amount}</td>
                <td className="py-2 px-3">{income.note || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className="text-indigo-400" />
        <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
        <table className="w-full text-sm text-left">
          <thead className="bg-red-100">
            <tr>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id} className="border-b">
                <td className="py-2 px-3">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-3">{exp.category}</td>
                <td className="py-2 px-3">Rs{exp.amount}</td>
                <td className="py-2 px-3">{exp.note || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
