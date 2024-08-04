import { useState } from "react";


export default function useAlert() {
  const[alert,setAlert] = useState(false)
  const[alertType,setAlertType] = useState(null)
  const[alertMessage,setAlertMessage] = useState(null)

  return {alert,alertType,alertMessage}
}

