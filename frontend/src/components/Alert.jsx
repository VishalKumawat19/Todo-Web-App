import React from "react";

function Alert({message,type}) {
  return type == "success" ? (
    <div className="alert-container success-alert">
        <p>{message}</p>
    </div>
  ) : (
    <div className="alert-container error-alert">
        <p>{message}</p>
    </div>
  );
}

export default Alert;
