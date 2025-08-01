import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import { URLS } from "../../constants/apiRoute";

const CourseCategory = () => {
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const resCat = await instance.get(URLS.GET_COURSE_CATEGORIES);
      setCategories(resCat.data);
      console.log(resCat.data);
    } catch (error) {
      console.log("Failed to fetch categories");
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
      const newCat = await instance.post(URLS.COURSE_CATEGORY, {
        name: category,
      });
      console.log(newCat.data);
      setCategory("");
      fetchCategories();
    } catch (error) {
      console.log(
        "Failed to add category",
        error.response?.data || error.message
      );
    }
  };

  const delCategory = async (id) => {
    try {
      const deletedcat = await instance.delete(`${URLS.DEL_COURSE}/${id}`);
    } catch (error) {
      toast.error("Failed to delete category");
    }
    fetchCategories();
  };
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Course Categories</h2>
      <form onSubmit={addCategory} className="flex gap-3 mb-6">
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Add new category"
          value={category}
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
                onClick={() => delCategory(category._id)}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseCategory;
