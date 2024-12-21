import Register from "./components/auth/Register";
//import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/auth/Login";
import ForgetPassword from "./components/auth/ForgetPassword";
import VerifyOtp from "./components/auth/VerifyOtp";
import UpdatePassword from "./components/auth/UpdatePassword";
import Super from "./components/ui2/Super";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget/password" element={<ForgetPassword />} />
      <Route element={<Super />}>
        <Route path="/otp/verify" element={<VerifyOtp />} />
        <Route path="/password/update" element={<UpdatePassword />} />
      </Route>
    </Routes>
  );
};

export default App;
