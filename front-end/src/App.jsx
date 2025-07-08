import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";

import ExpensesForm from "./pages/admin/ExpensesForm";
import Error from "./pages/Error";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import IncomeForm from "./pages/admin/Incomes";
import List from "./pages/admin/users/List";
import AddUser from "./pages/admin/users/AddUser";
import Register from "./pages/auth/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/auth">
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Routes */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-income" element={<IncomeForm />} />
        <Route path="create" element={<AddUser />} />
        <Route path="users/list" element={<List />} />
        <Route path="expense" element={<ExpensesForm />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
