import React, { useState } from "react";


/**
 * Props:
 * - loggedInUser: login function received from parent 
 * 
 * State:
 *  - formData
 * 
 * App --> Routes --> LoginForm
 */

function LoginForm({ loggedInUser }) {
  const initialState = {username: "", password: ""};
  const [formData, setFormData] = useState(initialState);

  //Must show Alert message to validate form input
  
  
  function handleSubmit(evt) {
    evt.preventDefault();
    // handle form input to send to parent
    // redirect to /companies using history
  }

  
  return (
    <p>LoginForm</p>
  )
}

export default LoginForm;