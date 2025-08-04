import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLS } from "../constants/apiRoute";
import instance from "../utils/axios";
import { toast } from "react-toastify";

const useExpense = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
    paymentMethod: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await instance.get(URLS.GET_EXPENSE_CATEGORIES);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const finalAmount = {
      ...expense,
      amount: Number(expense.amount),
    };

    //backed-api
    try {
      const expenseRes = await instance.post(URLS.EXPENSE, finalAmount, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg("Expense Created successfully");
      toast("Expense successfully created");
      setExpense({
        title: "",
        date: "",
        category: "",
        description: "",
        amount: "",
        paymentMethod: "",
      });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      console.log("Error in fetching expense API", error);
      setMsg("Something went wrong.");
      toast("Something went wrong");
    }
  };

  return {
    expense,
    handleChange,
    handleSubmit,
    categories,
  };
};

export default useExpense;
