import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import { URLS } from "../../constants/apiRoute";
import { toast, ToastContainer } from "react-toastify";

const IncomeCategory = () => {
  const [newCategory, setNewCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const respnse = await instance.get(URLS.GET_INCOME_CATEGORIES);
      setCategories(respnse.data.categories);
      console.log(respnse.data.categories);
    } catch (error) {
      toast.error("Failed to fetch income categories");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post(URLS.ADD_INCOME_CATEGORY, {
        name: newCategory,
      });
      setNewCategory("");
      toast.success("Income added successful");
    } catch (error) {
      toast.error("Failed to add income category");
    }
  };
  const deleteCategory = async (id) => {
    try {
      const resp = await instance.delete(`${URLS.DEL_INCOME_CATEGORY}/${id}`);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Income category");
    }
    fetchCategories();
  };

  return (
    <div>
      <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4 text-center">
          Income Categories
        </h2>
        <form onSubmit={addCategory} className="flex gap-3 mb-6">
          <input
            type="text"
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            value={newCategory}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </form>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <ul className="divide-y">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center py-2"
              >
                <span>{category.name}</span>
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IncomeCategory;
