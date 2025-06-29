import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ExpensesForm from "./pages/admin/ExpensesForm";
import Balance from "./pages/admin/Balance";
import Error from "./pages/Error";
import AdminLayout from "./layout/AdminLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/auth">
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="create" element={<Register />} />
        <Route path="expense" element={<ExpensesForm />} />
        <Route path="balance" element={<Balance />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
