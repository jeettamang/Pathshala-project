import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../utils/axios";
import { URLS } from "../../../constants/apiRoute";
import { ToastContainer, toast } from "react-toastify";
import TextFields from "../../../components/TextFields";

const AddUser = () => {
  const [categories, setCategories] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    payment: "",
  });
  const [message, setMessage] = useState("");
  const [courseFee, setCourseFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const resCat = await instance.get(URLS.GET_COURSE_CATEGORIES);
      setCategories(resCat.data);
      toast.success("Course categories fetched");
    } catch (error) {
      toast.error("Failed to fetch course categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "course") {
      const selected = categories.find((cat) => cat.name === value);
      setPayload({ ...payload, course: value, payment: "" });
      setCourseFee(selected?.fee || 0);
    } else {
      setPayload({ ...payload, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, course, payment } = payload;

    if (!name || !email || !password || !course || payment === "") {
      setMessage("All fields are required");
      return;
    }

    const paymentNumber = Number(payment);

    if (
      isNaN(paymentNumber) ||
      paymentNumber < 0 ||
      paymentNumber > courseFee
    ) {
      setMessage(`Payment must be between 0 and Rs. ${courseFee}`);
      return;
    }

    try {
      const finalPayload = {
        ...payload,
        payment: paymentNumber,
      };

      await instance.post(URLS.ADD_USER, finalPayload);

      setPayload({
        name: "",
        email: "",
        password: "",
        course: "",
        payment: "",
      });
      setCourseFee(0);
      setMessage("");
      toast.success("User added successfully");

      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error in registering user");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add new user
        </h2>

        {message && (
          <p className="text-red-600 font-semibold mb-4 text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <TextFields
            type="text"
            label="Name"
            name="name"
            id="name"
            placeholder="User's full name"
            value={payload.name}
            onChange={handleChange}
            required
          />
          <TextFields
            type="email"
            label="Email"
            name="email"
            id="email"
            placeholder="User's email"
            value={payload.email}
            onChange={handleChange}
            required
          />
          <TextFields
            type="password"
            label="Password"
            name="password"
            id="password"
            placeholder="**********"
            value={payload.password}
            onChange={handleChange}
            required
          />

          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="course"
          >
            Course
          </label>
          <select
            name="course"
            id="course"
            value={payload.course}
            onChange={handleChange}
            className="block w-full py-2 px-3 border rounded-lg focus:outline-none mb-2"
            required
          >
            <option value="">Select course</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {courseFee > 0 && (
            <p className="text-gray-500 mb-2">
              Full Course Fee: Rs. {courseFee}
            </p>
          )}

          <TextFields
            type="number"
            label="Payment (partial allowed)"
            name="payment"
            id="payment"
            placeholder="Enter amount to pay"
            value={payload.payment}
            onChange={handleChange}
            required
            min={0}
            max={courseFee}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-4 rounded-lg"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
