import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NotAuthorized from "./NotAuthorized";
import "../styles/Home.css";
import DeleteTodo from "./DeleteTodo";
import EditTodoButton from "../components/EditTodoButton";
import Alert from "../components/Alert";

function Home() {
  const [status, setStatus] = useState(null);
  const [todoData, setTodoData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

 
  useEffect(() => {
    const getData = async () => {
      
      try {
       const response = await axios
          .get("/todo/data")
          // .then((response) => {
            setTodoData(response.data.todos);
            setStatus(response.status);
  
      } catch (error) {
        console.log("error getting todo data", error);
      }
    };
    getData()
    
  },[]);

  const deleteRequestForTodo = (id) => {
    axios
      .delete(`/todo/data/${id}`)
      .then((response) => {
        if (response.status == 200) {
          setAlert(true);
          setAlertType("success");
          setAlertMessage(response.data.message);

          setTodoData(todoData.filter((todo) => todo._id != id));

          setTimeout(() => {
            setAlert(false);
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return status == 200 ? (
    <>
      <Navbar />
      {alert ? <Alert type={alertType} message={alertMessage} /> : ""}
      <div className="home-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {todoData.map((todo) => (
              <tr key={todo._id} className="tableHeaderRow">
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <DeleteTodo id={todo._id} onDelete={deleteRequestForTodo} />
                  <EditTodoButton id={todo._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <NotAuthorized />
  );
}

export default Home;
