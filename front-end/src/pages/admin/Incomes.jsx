import { useState } from "react";
import instance from "../../utils/axios";
import { URLS } from "../../constants/apiRoute";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const IncomeForm = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <ToastContainer />
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Entry Incomes
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {" "}
            <div>
              <label
                htmlFor="Date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={income.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Category */}
            <div>
              <label
                htmlFor="Category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                type="category"
                id="category"
                name="category"
                value={income.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Select Category</option>
                <option value="digital-marketing">Digital marketing</option>
                <option value="mern-stack">Mern Stack</option>
                <option value="reactjs">Reactjs</option>
                <option value="nextjs">Nextjs</option>
                <option value="python">Python with Django</option>
                <option value="ai">AI/ML</option>
                <option value="others">Others</option>
              </select>
            </div>
            {/* description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <input
                type="description"
                id="description"
                name="description"
                placeholder="income description"
                value={income.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount (Rs)
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter amount"
                value={income.amount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
            >
              Add Income
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default IncomeForm;
