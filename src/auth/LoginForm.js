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
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);


  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", errors,
  );

  const history = useHistory();

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
      history.push("/companies");
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
              <label htmlFor="LoginForm-username">username</label>
              <input
                name="username"
                id="LoginForm-username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="LoginForm-password">password</label>
              <input
                id="LoginForm-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {errors.length ? <Alert messages={errors}/> : null}

            <button className="btn btn-primary float-right" >Log in</button>
          </form>
        </div>

      </div>

    </div>



  )
}

export default LoginForm;