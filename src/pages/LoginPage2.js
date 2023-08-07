import axios from "api/axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const LoginPage2 = () => {
  const [test] = useSearchParams();
  const dispatch = useDispatch();
  console.log(test.get("code"));
  useEffect(() => {
    if (test)
      axios
        .post("/auth/login", {
          code: `${test.get("code")}${process.env.REACT_APP_SECRET_KEY}`,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  return <div></div>;
};

export default LoginPage2;
