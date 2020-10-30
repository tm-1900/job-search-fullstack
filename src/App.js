import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './routes-nav/Routes';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from './auth/UserContext';
import JoblyApi from "./api/api.js";
import { BrowserRouter } from "react-router-dom";
import Navbar from './routes-nav/Navbar';
import jwt from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";

// Key name to store token in localStorage, to remember the user for re-login
export const TOKEN_STORAGE_ID = "userToken";

/**
 * State:
 * - currentUser - a string, will be used connect with API to get token
 *  - from API, used to tell if a user is logged in and is passed
 *  - around through context throughout the app.
 * 
 * - currentUserToken - this is the token for logged in user, the user's 
 *  authentication JWT. It's required to be set for most API calls.
 * 
 * App --> Routes
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserToken, setCurrentUserToken] = useLocalStorage(TOKEN_STORAGE_ID);
  //const [applicationIds, setApplicationIds] = useState(new Set([]));

  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

  console.debug("App",
    "App",
    "isLoading=", isLoading,
    "currentUser=", currentUser,
    "currentUserToken=", currentUserToken);

  /** Load user info from API. This effect will only run if a user is logged
   * in and have a token. The token will be saved to localStorage. 
   * This will re-run when the user logs out, this means the value of 
   * the token is a dependency for the useEffect.
   */
  useEffect(function loadUserInfoWithToken() {
    console.debug("App useEffect loadUserInfoWithToken",
      "currentUserToken=", currentUserToken);
   
    async function getUserFromToken() {
      if (currentUserToken){
        try {
          // decode the currentUserToken and get username, returns str
          const { username } = jwt.decode(currentUserToken);

          // save tokenFromLS to API class
          JoblyApi.token = currentUserToken;

          // make an api request for the user info using the username
          let currentUser = await JoblyApi.getUser(username);

          // setCurrentUser based on response of api
          setCurrentUser(currentUser);
        } catch (err) {
          //setError(err)
          setCurrentUser(null)
        } 
      }
      setIsLoading(true);
    }
    setIsLoading(false);
    getUserFromToken();
  }, [currentUserToken])


  /** Reset user state be empty object. */
  function logoutUser() {
    setCurrentUser(null)
    setCurrentUserToken(null);
  }

  /**Log in user */
  async function login(formData) {
    const token = await JoblyApi.login(formData);
    setCurrentUserToken(token);
  }

  async function signup(formData) {
    const newUserToken = await JoblyApi.signup(formData);
    setCurrentUserToken(newUserToken);
  }

  /*edit user profile*/
  async function editProfile(userDetail){
    const user = await JoblyApi.updateUserProfile(userDetail);
    console.debug("editProfile",
      "loadUserInfoWithToken",
      "currentUser=", currentUser,
      "user=", user);
    setCurrentUser(user);
  }

  // show loading 
   if (!isLoading) return (<p>Loading...</p>);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Navbar logoutUser={logoutUser} />
          <Routes signup={signup}
            login={login} editProfile={editProfile}/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
