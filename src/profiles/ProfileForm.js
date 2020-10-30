import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";


/**
 * Props:
 *  -updateUser function received from parent
 *  -userInfo: user info object like { first_name, last_name, email }
 * 
 * State: 
 *  -formData
 * 
 * App --> Routes --> ProfileForm
 */

function ProfileForm({ editProfile }) {
  const { currentUser } = useContext(UserContext);

  const history = useHistory();
  const [formErrors, setFormErrors] = useState([])

  // get state form currentUser passed down through useContext
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });

  console.debug("ProfileForm",
    "currentUser=", currentUser,
    "formData=", formData,
    "formErrors=", formErrors)
  
  /**handle form submit to update profile */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try{
      await editProfile(formData);
      history.push("/")
    }catch(err){
      setFormErrors(err)
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
    setFormErrors([])
  }

  return (
    <div className="ProfileForm">
      <div className="container col-md-6 offset-md-3 col-log-4">
        <h2 className="mb-3"> Edit your profile!</h2>
        <div className="card-body">

          <form className="Profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ProfileFrom-firstName"> First Name </label>
              <input
                className="form-control"
                id="profile-form-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}>
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="ProfileForm-lastName"> Last Name </label>
              <input
                className="form-control"
                id="ProfileForm-lastName"
                name="lastName"
                type="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ProfileForm-email"> Email </label>
              <input
                className="form-control"
                id="ProfileForm-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ProfileForm-password"> Enter password to make changes </label>
              <input
                className="form-control"
                id="ProfileForm-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length ?
              <Alert type="danger" messages={formErrors} />
              : null}
            <button>Submit!</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm;