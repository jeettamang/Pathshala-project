import { Menu, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-100 sticky top-0">
      <nav className="bg-[#ffffff] border-b-2 border-s-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 text-white text-2xl font-bold">
              <img
                className="w-[250px] h-auto"
                src="https://www.digitalpathshalanepal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.0f377457.png&w=640&q=75"
                alt="pathshala"
              />
            </div>

            <Menu className="w-6 h-6 text-black" />
            <div>
              <input
                className="px-4 py-2 w-80 rounded-lg"
                type="search"
                placeholder="search course by name"
              />
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 text-black ">
              <Link to="#" className="hover:text-indigo-500 transition">
                Upcoming classes
              </Link>
              <Link to="#" className="hover:text-indigo-500 transition">
                Apply for internship
              </Link>
            </div>
            {/* Desktop Button */}
            <div className="hidden md:block">
              <Link
                to="/register"
                className="bg-white text-indigo-700 px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold"
              >
                Student Portal
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                id="menu-toggle"
                className="text-white focus:outline-none text-2xl"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className="md:hidden hidden px-4 pb-4 space-y-2 text-white font-medium"
        >
          <Link to="#" className="block hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="#" className="block hover:text-yellow-300 transition">
            About
          </Link>
          <Link to="#" className="block hover:text-yellow-300 transition">
            Services
          </Link>
          <Link to="#" className="block hover:text-yellow-300 transition">
            Contact
          </Link>
          <Link
            to="/register"
            className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
