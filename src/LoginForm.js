import React, { useState } from "react";
import {useHistory} from "react-router-dom"


/**
 * Props:
 * - login
 * 
 * State:
 *  - formData
 *  - error
 * 
 * App --> Routes --> LoginForm
 */

function LoginForm({ login }) {
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const history = useHistory();


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Handle form inputs to send to parent component,
   * redirect to /companies 
   * */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      history.push("/companies");
    } catch (err) {
      setError(err);
    }
  }

  function showError() {
    //console.log("this is error in showError", error)
    if (error) return (<p> {error} </p>);
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