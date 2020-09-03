import React, { useState } from "react";

/**
 * Prop:
 *  - signupUser function received from parent
 * 
 * State:
 *  -formData
 * App --> Routes --> SignupForm
 */

function SignupForm({signupUser}) {
  const inititialSate = {username:"", password:"",
                        first_name:"", last_name:"",
                        email:""};
  
  const [formData, setFormData] = useState(inititialSate)

  //Alert message if invalid inputs (validatio msgs)

  function handleSubmit(evt) {
    evt.preventDefault();
    // handle form input to send to parent
    // redirect to /companies using history
  }


  return (
    <p>SignupForm</p>
  )
}

export default SignupForm;