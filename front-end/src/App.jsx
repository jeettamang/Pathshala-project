import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";

import ExpensesForm from "./pages/admin/ExpensesForm";
import Error from "./pages/Error";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import IncomeForm from "./pages/admin/Incomes";
import List from "./pages/admin/users/List";
import AddUser from "./pages/admin/users/AddUser";
import Register from "./pages/auth/Register";
import CourseCategory from "./pages/admin/CourseCategory";
import Profile from "./pages/admin/Profile";
import UserDetail from "./pages/admin/users/UserDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/auth">
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Routes */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="add-income" element={<IncomeForm />} />
        <Route path="expense" element={<ExpensesForm />} />
        <Route path="course-category" element={<CourseCategory />} />
        <Route path="profile" element={<Profile />} />

        <Route path="users">
          <Route index element={<List />} />
          <Route path="create" element={<AddUser />} />
          <Route path="detail/:id" element={<UserDetail />} />
        </Route>
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
