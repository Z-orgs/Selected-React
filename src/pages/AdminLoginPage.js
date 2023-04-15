import React, { useState } from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    console.log(user);
    loginUser(user, dispatch, navigate);
  };


  // return <LayoutAuthentication heading="Login"></LayoutAuthentication>;
  return (
    <div>
      <a href="http://localhost:3000/auth"> Login with GG</a>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
