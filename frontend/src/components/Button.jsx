import React from 'react'
import '../styles/Button.css'

function Button({submitValue}) {
  return (
    <div className='btn-container'>
      <button type='submit' className='btn'>{submitValue}</button>
    </div>
  )
}

export default Button
