import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { useHistory } from "react-router-dom";

/**
 * Prop:
 *  - setCurrentUser
*   - setCurrentUserToken
 * 
 * State:
 *  -formData
 * App --> Routes --> SignupForm
 */

function SignupForm({ setCurrentUserToken, setCurrentUser}) {
  const inititialSate = {username:"", password:"",
    firstName:"", lastName:"",
                        email:""};
  
  const [formData, setFormData] = useState(inititialSate)
  const [newUserInfo, setNewUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submit, setSubmit] = useState(false);

  const history = useHistory();

  useEffect(function createUser(){
    async function addUserToDb(){
      try{
        const newUserToken = await JoblyApi.registerUser(newUserInfo);
        
        setCurrentUserToken(newUserToken);
        setCurrentUser(newUserInfo)
        history.push("/companies");
      }catch(err){
        setError(err)
      }finally{
        setIsLoading(false);
      }
    }
    addUserToDb();
  }, [newUserInfo, setCurrentUser, setCurrentUserToken])
  

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  //todo. why does error render so many times
  function handleSubmit(evt) {
    // handle form input to send to parent
    // redirect to /companies using history
    evt.preventDefault();
    // setError(null);

    setNewUserInfo(formData);
    setFormData(inititialSate);
    setSubmit(true);

  }

  /** 
 * Get data from SignupFrom, makes an api request to add user
 * into db.
 */
  //function signupUser() { }

  function showLoadingOrError(){
    if (isLoading) return (<p>Loading...</p>);
    if (error && submit) return (<p> {error} </p>);
    //console.log("this is error in showLoadingOrError", error)
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
      {showLoadingOrError()}
    </>
  )
}

export default SignupForm;