import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import instance from "../utils/axios";
import { URLS } from "../constants/apiRoute";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth/login");
      }
      try {
        const response = await instance.get(URLS.ADMIN_VERIFY, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response", response);
        if (!response.data.decoded) {
          navigate("/auth/login");
        }
      } catch (error) {
        navigate("/auth/login");
        console.log("Error", error);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-auto ml-60">
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
