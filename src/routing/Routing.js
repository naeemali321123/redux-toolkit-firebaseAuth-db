import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bootstrap from "../pages/bootstrap/Bootstrap";
import TodoApp from "../pages/todoApp/TodoApp";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { useSelector } from "react-redux";
import NavbarBootStcrap from "../features/navbarBootstrap/NavbarBootStcrap";
import Links from "../features/footer/links/Links";
import AddProduct from "../features/addProduct/AddProduct";
import ProductDetail from "../features/productDetail/ProductDetail";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";

export default function Routing() {
  const isLoginUser = useSelector((state) => state.auth.isAuthentication);
  console.log("isLoginUser", isLoginUser);
  return (
    <>
      <Router>
        <NavbarBootStcrap />
        <Routes>
          <Route path="/" element={<Bootstrap />} />
          <Route path="/todoApp" element={<TodoApp />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={isLoginUser ? <Bootstrap /> : <Login />}
          />
          <Route
            path="/addproduct"
            element={isLoginUser ? <AddProduct /> : <Login />}
          />
          <Route
            path="/productDetail"
            element={isLoginUser ? <ProductDetail /> : <Login />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Links />
      </Router>
    </>
  );
}
