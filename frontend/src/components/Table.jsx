import React from 'react'

function Table({todos}) {
  return (
    
       <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
        
         {todos.lenth?<tbody>
            {todos.map((todo)=>{
                <tr>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>hi</td>
                </tr>
            })}
          </tbody>:""}
         
        </table>
   
  )
}

export default Table
