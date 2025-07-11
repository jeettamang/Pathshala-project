import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex w-60 flex-col h-full text-gray-400 bg-gray-900 fixed">
      <Link className="flex items-center w-full px-3 mt-3" to="/">
        {/* Cube or logo-like icon */}
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span className="ml-2 text-sm font-bold">Expense Mgnt</span>
      </Link>

      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            to="/admin/dashboard"
          >
            {/* Home */}
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Dashboard</span>
          </Link>

          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            to="/admin/create"
          >
            {/* User-plus icon */}
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v6m3-3h-6m-2 5a4 4 0 10-8 0m8 0a4 4 0 01-8 0m8 0H4m16-7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Add user</span>
          </Link>
        </div>

        <div className="flex flex-col items-center w-full mt-2 border-gray-700">
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            to="/admin/expense"
          >
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v6m-3-3h6m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Add expense</span>
          </Link>
        </div>

        <div className="flex flex-col items-center w-full mt-2 border-gray-700">
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            to="/admin/add-income"
          >
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Add income</span>
          </Link>
        </div>

        <div className="flex flex-col items-center w-full mt-2 border-gray-700">
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            to="/admin/users/list"
          >
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 13H2"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">User list</span>
          </Link>
        </div>

        <div className="flex flex-col items-center w-full mt-2 border-gray-700">
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            to="/admin/category"
          >
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M3 11V5a2 2 0 012-2h6l8 8-6 6-8-8z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Category</span>
          </Link>
        </div>
      </div>

      <Link
        className="flex items-center justify-start w-full h-10 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
        to="/edit/profile"
      >
        <svg
          className="w-6 h-6 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="ml-2 text-md font-xl">Profile</span>
      </Link>
    </div>
  );
};

export default Sidebar;
