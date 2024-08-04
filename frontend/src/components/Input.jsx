import React, { useState } from "react";
import "../styles/Input.css";

function Input({
  value,
  onChange,
  id,
  label,
  Name,
  inputOptionType,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return inputOptionType!='password'? (
    (
      <div className="input-container input-text">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        <input
          value={value}
          onChange={onChange}
          required
          id={id}
          name={Name}
          className="input-box"
          autoComplete="off"
          
        />
      </div>
    )
  ) : (
    <div style={{display:'flex'}}>
      <div className="input-container input-password">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        <input
          value={value}
          onChange={onChange}
          required
          id={id}
          name={Name}
          className="input-box"
          autoComplete="off"
          type={passwordVisible ? 'text' : 'password'}
        />
      </div>
      <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            border:"none",
            backgroundColor:"",
            marginLeft: '10px',
            marginTop:'15px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          {passwordVisible ? 'Hide' : 'Show'}
        </button>
    </div>
  )
}

export default Input;
