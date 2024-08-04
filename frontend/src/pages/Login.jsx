import React, { useState } from "react";
import TextHeading from "../components/TextHeading";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/Login.css";
import axios from "../utils/axios.js";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Login() {
  const navigateTo = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleOnChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/users/login`, loginData);
      if (response.status === 200) {
        navigateTo("/home");
      }
    } catch (error) {
      console.log("Failed to login", error);
      setAlert(true);
      setAlertType("error");
      setAlertMessage(error.response.data.message);

    }
  };


  return (
    <>
      <div className="login-container no-select">
        <TextHeading textHeading={"Login to continue..."} />
        {alert ? <Alert type={alertType} message={alertMessage} /> : ""}
        <form action="" onSubmit={handleSubmit}>
          <Input
            value={loginData.username}
            onChange={handleOnChange}
            id={"username"}
            Name={"username"}
            label={"Username"}
          />
          <Input
            value={loginData.password}
            onChange={handleOnChange}
            id={"password"}
            Name={"password"}
            label={"Password"}
            inputOptionType={"password"}
          />
          <Button submitValue={"Login"} />
        </form>
      </div>
      <div className="signup-option no-select">
        New User ?{" "}
        <Link
          to={"/register"}
          style={{ textDecoration: "none", color: "blue" }}
        >
          Register
        </Link>
      </div>
    </>
  );
  

}
