import axios from "axios";
import React from "react";


function DeleteTodo({ id,onDelete }) {

const handleDelete = () => {
  onDelete(id)
}
  

  return (
    <button className="delete-btn" onClick={handleDelete}>
      <i className="fa-solid fa-trash"></i>
    </button>
  );
}

export default DeleteTodo;
