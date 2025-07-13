import { useEffect, useState } from "react";
import { URLS } from "../../constants/apiRoute";
import instance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return redirectToLogin();

        const res = await instance.get(URLS.ADMIN_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user;
        setUser(user);

        if (user?.email === "jeettamang011@gmail.com") {
          setIsAllowed(true);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        redirectToLogin();
      } finally {
        setLoading(false);
      }
    };

    const redirectToLogin = () => {
      localStorage.removeItem("token");
      navigate("/auth/login");
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        {isAllowed && (
          <p className="text-green-600 font-medium">You are the Super Admin</p>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
