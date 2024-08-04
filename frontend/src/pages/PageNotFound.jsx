import React from 'react'
import '../styles/PageNotFound.css'

function PageNotFound() {
  return (
    <div className="pnf-container">
      <div className="container">
    <h1 className='pnf-heading'>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <p><a href="/" className='pnf-a'>Go back to the login</a></p>
    </div>
</div>
  )
}

export default PageNotFound
