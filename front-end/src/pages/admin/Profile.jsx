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
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10 flex items-center space-x-6">
      <img
        src="/src/assets/profile.png"
        alt="Profile"
        className="w-32 h=50 rounded-md object-cover"
      />

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <p className="text-lg">
          <span className="font-semibold">Name:</span> Jeet Tamang
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> jeettamang011@gmail.com
        </p>
        <p className="text-green-600 font-semibold mt-2">
          You are the Super Admin
        </p>

        <button
          onClick={handleLogout}
          className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
