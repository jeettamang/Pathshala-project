import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
