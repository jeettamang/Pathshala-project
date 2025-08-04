import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import { URLS } from "../../constants/apiRoute";
import { toast } from "react-toastify";

const CourseCategory = () => {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [duration, setDuration] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const resCat = await instance.get(URLS.GET_COURSE_CATEGORIES);
      setCategories(resCat.data);
      console.log(resCat.data);
      toast.success("Cateogry fetched succeed");
    } catch (error) {
      console.log("Failed to fetch categories");
      toast.error("Failed to fetch Cateogry ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    const parsedFee = Number(fee);

    // ✅ Fixed validation
    if (!name.trim() || isNaN(parsedFee) || !duration.trim()) {
      toast.error("Please enter valid name, fee, and duration.");
      return;
    }

    try {
      const res = await instance.post(URLS.COURSE_CATEGORY, {
        name,
        fee: parsedFee,
        duration,
      });
      toast.success("Category added successfully");
      setName("");
      setFee("");
      setDuration("");
      fetchCategories();
      console.log("Sending:", { name, fee: parsedFee, duration });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add category");
      console.error("Add category error:", error);
    }
  };

  const delCategory = async (id) => {
    try {
      await instance.delete(URLS.DEL_COURSE(id));
      fetchCategories();
      toast.success("Cateogry deleted succeed");
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Cateogry delete failed");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-cente">Course Categories</h2>

      <form onSubmit={addCategory} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          value={name}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          onChange={(e) => setFee(e.target.value)}
          placeholder="Course fee (NPR)"
          value={fee}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Course duration (e.g. 3 months)"
          value={duration}
          className="px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Category
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
              <div>
                <p className="font-semibold">{category.name}</p>
                <p className="text-sm text-gray-600">Fee: Rs. {category.fee}</p>
                <p className="text-sm text-gray-600">
                  Duration: {category.duration}
                </p>
              </div>
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
