import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import "./App.css";
import { auth } from "./config/Firebase";
import Routing from "./routing/Routing";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import { Navigate } from "react-router-dom";


function App() {
  const isAuthentication = useSelector((store)=>store.auth.isAuthentication)
  const dispatch = useDispatch();
  console.log('isAuthentication fetch by store', isAuthentication);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout(user));
      } 
    });
  }, []);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
