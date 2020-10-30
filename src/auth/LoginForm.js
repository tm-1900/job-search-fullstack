import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";


/**
 * Props:
 * - login
 * 
 * State:
 *  - formData
 *  - errors
 * 
 * App --> Routes --> LoginForm
 */

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "testuser", password: "password" });
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", errors,
  );


  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Handle form submit
   * Must show Alert message to validate form input
   * */
  async function handleSubmit(evt) {
    // handle form input to send to parent
    // redirect to /companies using history
    evt.preventDefault();
    try {
      await login(formData);
      history.push("/companies")
    } catch (err) {
      setErrors(err);
    }
  }


  return (

    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3"> Log In</h2>
        <div className="card-body">

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="LoginForm-username">Username</label>
              <input
                name="username"
                id="LoginForm-username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="LoginForm-password">Password</label>
              <input
                id="LoginForm-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                autoComplete="password"
              />
            </div>

            {errors.length ? <Alert messages={errors} /> : null}

            <button className="btn btn-primary float-right" >Submit!</button>
          </form>
        </div>

      </div>

    </div>



  )
}

export default LoginForm;