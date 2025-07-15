import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { URLS } from "../constants/apiRoute";

const useDashboard = () => {
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

  return {
    summary,
    filterDate,
    setFilterDate,
    filteredIncomes,
    filteredExpenses,
  };
};

export default useDashboard;
