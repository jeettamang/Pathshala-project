import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import { URLS } from "../../../constants/apiRoute";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await instance.get(URLS.USER_LIST);
        setUsers(res.data.users);
      } catch (error) {
        console.error("User list fetching error", error);
      }
    };
    fetchUsers();
  }, []);
  const handleViewUser = (userId) => {
    navigate(`/admin/users/${userId}`);
  };
  return (
    <div className="bg-slate-100 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">User Lists</h2>
      <table className="w-full text-sm text-left py-2 my-2">
        <thead>
          <tr className="border-b-2 border-green-200">
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Course</th>
            <th className="py-2 px-3">payment</th>
            <th className="py-2 px-3">Due amount</th>
            <th className="py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b border-indigo-100">
              <td className="py-2 px-3">{user.name}</td>
              <td className="py-2 px-3">{user.course}</td>
              <td className="py-2 px-3">Rs. {user.payment}</td>
              <td className="py-2 px-3">Rs. {user.remaining}</td>
              <td className="py-2 px-3">
                <button
                  onClick={() => handleViewUser(user._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
