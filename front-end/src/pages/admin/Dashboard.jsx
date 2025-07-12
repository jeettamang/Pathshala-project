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

  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDashboardData = async () => {
      try {
        const res = await instance.get(URLS.GET_DASHBOARD, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data.summary);
        setExpenses(res.data.expenses);
        setIncomes(res.data.incomes);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  const formattedFilterDate = filterDate
    ? new Date(filterDate).toLocaleDateString()
    : "";

  const filteredIncomes = filterDate
    ? incomes.filter(
        (inc) => new Date(inc.date).toLocaleDateString() === formattedFilterDate
      )
    : incomes;

  const filteredExpenses = filterDate
    ? expenses.filter(
        (exp) => new Date(exp.date).toLocaleDateString() === formattedFilterDate
      )
    : expenses;

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

      {/* Date Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={() => setFilterDate("")}
          className="ml-2 px-3 py-1 border rounded bg-gray-200"
        >
          Clear
        </button>
      </div>

      {/* Incomes Table */}
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
            {filteredIncomes.map((income) => (
              <tr key={income._id} className="border-b">
                <td className="py-2 px-3">
                  {new Date(income.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-3">{income.category}</td>
                <td className="py-2 px-3">Rs{income.amount}</td>
                <td className="py-2 px-3">{income.note || "-"}</td>
              </tr>
            ))}
            {filteredIncomes.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No income records found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <hr className="text-indigo-400 my-4" />

        {/* Expenses Table */}
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
            {filteredExpenses.map((exp) => (
              <tr key={exp._id} className="border-b">
                <td className="py-2 px-3">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-3">{exp.category}</td>
                <td className="py-2 px-3">Rs{exp.amount}</td>
                <td className="py-2 px-3">{exp.note || "-"}</td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No expense records found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
