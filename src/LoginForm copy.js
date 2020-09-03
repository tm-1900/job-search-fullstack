import React, { useState, useEffect } from "react";
import JoblyApi from './api';
import { useHistory } from "react-router-dom";

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

function LoginForm({ setCurrentUserToken, setCurrentUser }) {
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [userLoginInfo, setUserLoginInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submit, setSubmit] = useState(false);

  const history = useHistory();


  /** Gets data from LoginForm, makes an api request for that user,
 * if valid, setUser with api response. */
  // function loggedInUser(formData) {

  // }

  // todo: filter out password from login form to not be in state
  //useEffect get backend info and store token
  useEffect(function fetchUserToken() {
    async function fetchUser() {
      try {
        const result = await JoblyApi.getToken(userLoginInfo);
        const userDetail = await JoblyApi.getUser(userLoginInfo.username);

        setCurrentUserToken(result)
        setCurrentUser(userDetail)
        history.push("/companies");

      } catch (err) {
        //console.log("this is err after bad login", err);
        setError(err);

      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [setCurrentUserToken, setCurrentUser, history, isSubmitting]);
// }, [userLoginInfo, setCurrentUserToken, setCurrentUser, history, isSubmitting]);


  //Must show Alert message to validate form input


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    // handle form input to send to parent
    // redirect to /companies using history
    evt.preventDefault();
    // setUserLoginInfo(formData);
    setIsSubmitting(true)
    // setFormData(initialState);
    // setSubmit(true);
  }

  function showLoadingOrError() {
    if (isLoading) return (<p>Loading...</p>);
    if (error && submit) return (<p> {error} </p>);
    //console.log("this is error in showLoadingOrError", error)
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
      {showLoadingOrError()}
    </>
  )
}

export default LoginForm;