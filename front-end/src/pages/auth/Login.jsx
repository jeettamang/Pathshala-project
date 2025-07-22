import { Link } from "react-router-dom";
import useLogin from "../../custom-hooks/useLogin";
import { ToastContainer } from "react-toastify";
import TextFields from "../../components/TextFields";

const Login = () => {
  const { payload, message, handleChange, handleSubmit } = useLogin();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextFields
            type="email"
            label="Email"
            id="email"
            name="email"
            value={payload.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {/* Password */}
          <TextFields
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="**********"
            value={payload.password}
            onChange={handleChange}
            required
          />
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-1 rounded-lg shadow-md transition-all duration-200"
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
