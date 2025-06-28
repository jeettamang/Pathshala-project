import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ExpensesForm from "./pages/admin/ExpensesForm";
import AdminLayout from "./layout/AdminLayout";
import Balance from "./pages/admin/Balance";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/*Auth*/}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
        </Route>

        {/*Admin*/}
        <Route path="/admin">
          <Route path="create" element={<Register />} />
          <Route path="dashboard" element={<AdminLayout />} />
          <Route path="expense" element={<ExpensesForm />} />
          <Route path="balance" element={<Balance />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
