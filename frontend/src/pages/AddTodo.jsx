import React, { useEffect, useState } from "react";
import "../styles/AddTodo.css";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import NotAuthorized from "./NotAuthorized";
import Alert from "../components/Alert";

function AddTodo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [status, setStatus] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(
        "/todo/data"
      )
      .then((response) => {
        setStatus(response.status);
      })
      .catch((error) => {
        console.log("error getting todo", error);
      });
  }, []);

  const handleOnchange = (e) => {
    setFormData((preData) => ({
      ...preData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = formData.title;
      const description = formData.description;
      const response = await axios.post(
        "/todo/",
        {title, description }
        
      );

      if (response.status == 201) {
        setAlert(true)
        setAlertType('success')
        setAlertMessage(response.data.message)
        setTimeout(() => {
          setAlert(false)
          navigateTo("/home");
        }, 1500);
      }
     
    } catch (error) {
      console.log("Todo data submission error", error);
      if(error.response.status == 400){
        setAlert(true)
        setAlertType('error')
        setAlertMessage(error.response.data.message)
      }
    }
  };

  return status == 200 ? (
    <>
      {/* {showAlert && <Alert message={alertMessage} type={alertType} />} */}

      <Navbar />
      {alert ? <Alert type={alertType} message={alertMessage} /> : ""}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="title-container">
            <label htmlFor="title" className="input-label label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="input"
              onChange={handleOnchange}
              value={formData.title}
            />
          </div>
          <div className="description-container">
            <label htmlFor="description" className="input-label label">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="input"
              onChange={handleOnchange}
              value={formData.description}
            />
          </div>
          <div className="add-button-container">
            <button type="submit" className="todo-submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <NotAuthorized />
  );
}

export default AddTodo;
