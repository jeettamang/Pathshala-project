import useRegister from "../../custom-hooks/useRegister";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import TextFields from "../../components/TextFields";

const Register = () => {
  const { payload, handleChange, handleSubmit } = useRegister();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create new account
        </h2>
        <form onSubmit={handleSubmit}>
          <TextFields
            type="text"
            label="Name"
            name="name"
            id="name"
            placeholder="Enter your fullName"
            value={payload.name}
            onChange={handleChange}
            required
          />
          <TextFields
            type="email"
            label="Email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={payload.email}
            onChange={handleChange}
            required
          />
          <TextFields
            type="password"
            label="Password"
            name="password"
            id="password"
            placeholder="***********"
            value={payload.password}
            onChange={handleChange}
            required
          />
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
