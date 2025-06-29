import { useState } from "react";
import instance from "../../utils/axios";
import { URLS } from "../../constants/apiRoute";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ExpensesForm = () => {
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

    //backed-api
    try {
      const expenseRes = await instance.post(URLS.EXPENSE, expense);
      console.log(expenseRes);
      setMsg("Expense Created successfully");
      toast("Expense successfully created");
      setExpense({
        date: "",
        category: "",
        description: "",
        amount: "",
        paymentMethod: "",
      });

      setTimeout(() => {
        navigate("/admin/balance");
      }, 1000);
    } catch (error) {
      console.log("Error in fetching expense API", error);
      setMsg("Something went wrong.");
      toast("Something went wrong");
    }
  };

  return (
    <>
      <div className="w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <ToastContainer />
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Daily Expense Entry
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
                value={expense.date}
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
                value={expense.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Select Category</option>
                <option value="electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Salary">Salary</option>
                <option value="Rent">Rent</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Misc">Miscellaneous</option>
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
                placeholder="Expense description"
                value={expense.description}
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
                type="amount"
                name="amount"
                id="amount"
                placeholder="Enter amount"
                value={expense.amount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Payment method */}
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment Method
              </label>
              <select
                type="paymentMethod"
                id="paymentMethod"
                name="paymentMethod"
                value={expense.paymentMethod}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Select payment Method</option>
                <option value="Esewa">Esewa</option>
                <option value="Bank transfer">Bank transfer</option>
                <option value="khalti">Khalti</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExpensesForm;
