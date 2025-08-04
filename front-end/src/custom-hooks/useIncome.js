import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URLS } from "../constants/apiRoute";
import instance from "../utils/axios";

const useIncome = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [income, setIncome] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...income,
      amount: Number(income.amount),
    };
    console.log("Sending payload:", payload);
    //backed-api
    try {
      const incomeRes = await instance.post(URLS.ADD_INCOME, payload);
      console.log(incomeRes);
      setMsg("Income created successfully");
      toast("Income successfully created");
      setIncome({
        date: "",
        category: "",
        description: "",
        amount: "",
      });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      console.log("Error in fetching income API", error);
      setMsg("Something went wrong.");
      toast("Something went wrong");
    }
  };

  const allCategories = async () => {
    try {
      const fetchCategories = await instance.get(URLS.GET_INCOME_CATEGORIES, {
        name: categories,
      });
      setCategories(fetchCategories.data.categories);
      console.log(fetchCategories.data.categories);
    } catch (error) {}
  };
  useEffect(() => {
    allCategories();
  }, []);
  return {
    categories,
    income,
    setIncome,
    msg,
    handleChange,
    handleSubmit,
  };
};

export default useIncome;
