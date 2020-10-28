import React, {useState} from "react";


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

function ProfileForm({updateUser, userInfo}) {
  //get current user info and pre-populate the form
  //deconstruct firstname, ln, email
  //add in pw field to compare
  
  const user = userInfo
  const [formData, setFormData] = useState(user);


  //show alert message to valid form input

  function handleSubmit(evt) {
    evt.preventDefault();
    // handle user profile update input to send to parent
    // stays at to /ProfileFrom using history
  }

  
  return (
    <p>ProfileForm</p>
  )
}

export default ProfileForm;