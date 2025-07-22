import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { URLS } from "../constants/apiRoute";
import { getFiscalYear } from "../utils/fiscalDate";

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
        console.log("Expenses fetched:", res.data.expenses);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  const filteredIncomes = filterDate
    ? incomes.filter((inc) => {
        const incDate = new Date(inc.date);
        const fDate = new Date(filterDate);
        return (
          incDate.getFullYear() === fDate.getFullYear() &&
          incDate.getMonth() === fDate.getMonth() &&
          incDate.getDate() === fDate.getDate()
        );
      })
    : incomes;

  const filteredExpenses = filterDate
    ? expenses.filter((exp) => {
        const expDate = new Date(exp.date);
        const fDate = new Date(filterDate);
        return (
          expDate.getFullYear() === fDate.getFullYear() &&
          expDate.getMonth() === fDate.getMonth() &&
          expDate.getDate() === fDate.getDate()
        );
      })
    : expenses;

  const { start: fyStart, end: fyEnd, label: fiscalLabel } = getFiscalYear();

  const incomesThisFiscalYear = incomes.filter((inc) => {
    const d = new Date(inc.date);
    return d >= fyStart && d <= fyEnd;
  });

  const expensesThisFiscalYear = expenses.filter((exp) => {
    const d = new Date(exp.date);
    return d >= fyStart && d <= fyEnd;
  });

  return {
    summary,
    filterDate,
    setFilterDate,
    filteredIncomes,
    filteredExpenses,
    incomesThisFiscalYear,
    expensesThisFiscalYear,
    fiscalLabel,
  };
};

export default useDashboard;
