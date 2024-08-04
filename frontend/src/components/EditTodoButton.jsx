import React from 'react'
import { useNavigate } from 'react-router-dom';

function EditTodoButton({id}) {
  const navigateTo = useNavigate();
    const editRequestForTodo = () =>{
      navigateTo(`/todo/data/${id}`)
    
    }
    
      return (
        <button className='edit-btn' onClick={editRequestForTodo}><i className="fa-solid fa-pen-to-square"></i> </button>
      )
    }
 

export default EditTodoButton
