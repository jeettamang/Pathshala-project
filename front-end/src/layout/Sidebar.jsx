import { Link } from "react-router-dom";
import useSidebarLinks from "../custom-hooks/useSidebarLinks";

const Sidebar = () => {
  const links = useSidebarLinks();

  return (
    <div className="flex w-60 flex-col h-full text-gray-400 bg-gray-900 fixed">
      <Link className="flex items-center w-full px-3 mt-3" to="/">
        <span className="ml-2 text-sm font-bold">Expense Management</span>
      </Link>

      {/* Sidebar links from custom hook */}
      <div className="w-full px-2 mt-3 border-t border-gray-700">
        {links.map(({ to, iconPath, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
          >
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={iconPath}
              />
            </svg>
            <span className="ml-2 text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>

      <Link
        className="flex items-center justify-start w-full h-10 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
        to="/admin/profile"
      >
        <img
          src="/src/assets/profile.png"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="ml-2 text-md font-xl">Profile</span>
      </Link>
    </div>
  );
};

export default Sidebar;
