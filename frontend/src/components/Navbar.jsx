import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import axios from '../utils/axios'


function Navbar() {
    const navigateTo = useNavigate()
    const logoutHandler = async ()=>{
       try {
         const response = await axios.post('/users/logout')
         console.log(response)
         if  (response.status==200){
         navigateTo('/')
       }
       } catch (error) {
        console.log("failed to logout",error)
       }
        
    }
  return (
    <nav>
        <ul>
            <div className="navlink-container">
            <li ><Link to={'/home'} style={{ textDecoration: 'none' ,fontWeight:"400",}}>Home</Link></li>
            <li><Link to={'/todo'} style={{ textDecoration: 'none' ,fontWeight:"400"}}>Add Todo</Link></li>
           
            <li className='logout-link'><button onClick={logoutHandler}><i className="fa-solid fa-right-from-bracket"></i>Logout</button></li>
            </div>
        </ul>
    </nav>
  )
}

export default Navbar
