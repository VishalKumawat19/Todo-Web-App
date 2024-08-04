import React, { useState } from "react";
import TextHeading from "../components/TextHeading";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/Login.css";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigateTo = useNavigate();

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/users/register`, registerData);

      if (response.status === 201) {
        navigateTo("/home");
      }
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <>
      <div className="login-container no-select">
        <TextHeading textHeading={"Register here to continue..."} />
        <form action="" onSubmit={handleSubmit}>
          <Input
            value={registerData.username}
            onChange={handleOnChange}
            id={"username"}
            Name={"username"}
            label={"Username"}
            inputType={"text"}
          />
          <Input
            value={registerData.password}
            onChange={handleOnChange}
            id={"password"}
            Name={"password"}
            label={"Password"}
            inputOptionType={"password"}
          />
          <Button submitValue={"Register"} />
        </form>
      </div>
      <div
        className="login-option"
        style={{ marginTop: "1vh", textAlign: "center", "user-select": "none" }}
      >
        Already A User ?{" "}
        <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
          {" "}
          Login
        </Link>
      </div>
    </>
  );
}

export default Register;
