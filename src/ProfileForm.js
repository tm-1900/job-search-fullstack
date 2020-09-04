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
  const user = userInfo
  const [formData, setFormData] = useState(user);


  function handleSubmit(evt) {
    evt.preventDefault();
    // todo.handle user profile update input to send to parent
    // stays at to /ProfileFrom using history
  }

  
  return (
    <p>ProfileForm</p>
  )
}

export default ProfileForm;