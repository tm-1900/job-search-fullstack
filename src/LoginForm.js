import React, { useState, useEffect } from "react";
import JoblyApi from './api';
import {useHistory} from "react-router-dom"

/**
 * Props:
 * - loggedInUser: login function received from parent 
 * - setCurrentUser
 * - setCurrentUserToken
 * 
 * State:
 *  - formData
 * 
 * App --> Routes --> LoginForm
 */

function LoginForm({ login }) {
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const history = useHistory();


  //Must show Alert message to validate form input

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
    try {
      await login(formData);
      history.push("/companies");
    } catch (err) {
      setError(err);
    }
  }

  function showError() {
    if (error) return (<p> {error} </p>);
    //console.log("this is error in showError", error)
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="LoginForm-username">username</label>
        <input
          id="LoginForm-username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="LoginForm-password">password</label>
        <input
          id="LoginForm-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
      {showError()}
    </>
  )
}

export default LoginForm;