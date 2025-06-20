import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/*Auth*/}
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/*Admin*/}
        <Route path="/admin">
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
