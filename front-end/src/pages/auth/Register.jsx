import useRegister from "../../custom-hooks/useRegister";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const { payload, handleChange, handleSubmit } = useRegister();

  return (
    <div className="min-h-screen flex items-center place-content-center bg-gray-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create new account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={payload.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={payload.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={payload.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 text-white rounded-lg text-center font-semibold cursor-pointer"
          >
            Register
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link
              to="/auth/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
