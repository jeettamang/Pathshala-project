import { Link } from "react-router-dom";
import useLogin from "../../custom-hooks/useLogin";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { payload, message, handleChange, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to your Account
        </h2>
        <form
          onSubmit={handleSubmit}
          action="/register"
          method="POST"
          className="space-y-5"
        >
          {/* Full Name */}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={payload.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          {/* Password */}
          <div>
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
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          {/* Terms */}
          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 mr-2 text-blue-600 rounded focus:ring-0"
            />
            <label htmlFor="terms" className="text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                terms &amp; conditions
              </a>
            </label>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Login
          </button>
          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Dont't have an account?
            <Link
              to="/auth/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
