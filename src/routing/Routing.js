import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bootstrap from "../pages/bootstrap/Bootstrap";
import TodoApp from "../pages/todoApp/TodoApp";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { useSelector } from "react-redux";
import PrivateRoute from "./privateRoutes";

export default function Routing() {
  const isLoginUser = useSelector((state) => state.auth.isAuthentication);
  console.log("isLoginUser", isLoginUser);
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Bootstrap/>} />
          <Route path="/todoApp" element={<TodoApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
