import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../../utils/axios";
import { URLS } from "../../../constants/apiRoute";
import { ToastContainer } from "react-toastify";
import TextFields from "../../../components/TextFields";

const AddUser = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    payment: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "course") {
      const selected = courses.find((c) => c.name === value);
      setPayload({
        ...payload,
        course: value,
        payment: selected?.fee || "Fee not set",
      });
    } else {
      setPayload({
        ...payload,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, course, payment } = payload;

    if (!name || !email || !password || !course || !payment) {
      setMessage("All fields are required");
      return;
    }

    try {
      const finalPayload = {
        ...payload,
        payment: Number(payload.payment),
      };

      const resData = await instance.post(URLS.ADD_USER, finalPayload);
      console.log(resData);

      setPayload({
        name: "",
        email: "",
        password: "",
        course: "",
        payment: "",
      });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Error in fetching the data of registration"
      );
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await instance.get(URLS.GET_COURSES);
        setCourses(response.data.data || []);
      } catch (error) {
        console.log("Error in fetching courses", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add new user
        </h2>
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
            label="Emal"
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
            id="course"
            name="course"
            value={payload.course}
            onChange={handleChange}
            required
            className="block w-full py-2 px-3 border rounded-lg focus:outline-none mb-2"
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          <TextFields
            type="number"
            label="Payment"
            name="payment"
            id="payment"
            placeholder="Auto-filled after course selection"
            value={payload.payment}
            onChange={handleChange}
            required
            readOnly
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
