import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { loginHandler } from "../../features/auth/authSlice";
export default function Register() {
  const dispatch = useDispatch();
  const isProcessing = useSelector((store)=>store.auth.isProcessing)
  const [state, setState] = useState({});

  const changeHandlar = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandlar = async (e) => {
    e.preventDefault();
    dispatch(loginHandler(state));
  };
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row p-5 m-3 col-12 col-md-6 shadow">
        <div className="col-12 text-center">
          <h2> Login your Account</h2>
        </div>
        <form className="row g-3">
          <div className="col-12">
            <label for="validationServer01" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={state.email}
              className="form-control"
              id="validationServer01"
              onChange={changeHandlar}
              name="email"
              required
            />
          </div>

          <div className="col-12">
            <label for="validationServer02" className="form-label">
              password
            </label>
            <input
              onChange={changeHandlar}
              name="password"
              type="password"
              value={state.password}
              className="form-control"
              id="validationServer02"
              required
            />
          </div>
          <div className="col-md-12">
            {!isProcessing ? (
              <button
                onClick={submitHandlar}
                className="btn btn-success w-100"
                type="submit"
              >
                Login
              </button>
            ) : (
              <button
                onClick={submitHandlar}
                className="btn btn-success w-100 disabled"
                type="submit"
              >
                <div className="spinner-border spinner-border-sm text-warning disabled"></div>
              </button>
            )}
            <ToastContainer />
          </div>
        </form>
        <div className="row col-12 my-3 fw-bold">
          <Link to="/register">
            Registered your Account, if you don't have Account
          </Link>
        </div>
      </div>
    </div>
  );
}
