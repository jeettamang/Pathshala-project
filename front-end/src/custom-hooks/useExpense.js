import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLS } from "../constants/apiRoute";
import instance from "../utils/axios";
import { toast } from "react-toastify";

const useExpense = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
    paymentMethod: "",
  });
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalAmount = {
      ...expense,
      amount: Number(expense.amount),
    };

    //backed-api
    try {
      const expenseRes = await instance.post(URLS.EXPENSE, finalAmount);
      console.log(expenseRes);
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
  };
};

export default useExpense;
