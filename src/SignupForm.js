import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { useHistory } from "react-router-dom";

/**
 * Prop:
 *  - signUp
 * 
 * State:
 *  -formData
 * App --> Routes --> SignupForm
 */

function SignupForm({ signUp}) {
  const inititialSate = {username:"", password:"",
                        firstName:"", lastName:"",
                        email:""};
  
  const [formData, setFormData] = useState(inititialSate);
  const [error, setError] = useState(null);

  const history = useHistory();

  
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }


  async function handleSubmit(evt) {
    // handle form input to send to parent
    // redirect to /companies using history
    evt.preventDefault();
    // setError(null);

    try{
      //need await here bc if if don't have then it will immediately 
      // run history.push() immediately
      // await to stop and resolve the promise and if there's a error then 
      //go to catch 
      await signUp(formData);

      history.push("/companies");
    } catch(err){
      setError(err)
    }
  }


  function showError(){
    if (error) return (<p> {error} </p>);
    //console.log("this is error in showError", error)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="SignupForm-username">Username</label>
        <input
          id="SignupForm-username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="SignupForm-password">Password</label>
        <input
          id="SignupForm-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="SignupForm-firstName">First name</label>
        <input
          id="SignupForm-firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="SignupForm-lastName">Last name</label>
        <input
          id="SignupForm-lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="SignupForm-email">Email</label>
        <input
          id="SignupForm-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
      {showError()}
    </>
  )
}

export default SignupForm;