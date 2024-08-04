import React from 'react'
import '../styles/NotAuhorized.css'
import { Link } from 'react-router-dom'

function NotAuthorized() {
  return (
    <div className='not-authorized'>
      You are not authorized.Please login to continue
      <Link to={'/'} style={{ 'textDecoration': 'none','color':'blue'}}> Login</Link>
    </div>
  )
}

export default NotAuthorized
