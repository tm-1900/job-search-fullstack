import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './routes-nav/Routes';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from './auth/UserContext';
import JoblyApi from "./api/api.js"
import { BrowserRouter } from "react-router-dom"
import Navbar from './routes-nav/Navbar'
import jwt from "jsonwebtoken"

// Key name to store token in localStorage, to remember the user for re-login
export const TOKEN_STORAGE_ID = "userToken";

/**
 * State:
 * - currentUser - from API, used to tell if a user is logged in and is passed
 *  around through context throughout the app.
 * 
 * - currentUserToken - this is the token for logged in user, the user's 
 *  authentication JWT. It's required to be set for most API calls.
 * 
 * App --> Routes
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  //get initial currentUserToken from localStorage
  const initialToken = localStorage.getItem(TOKEN_STORAGE_ID)
  const [currentUserToken, setCurrentUserToken] = useState(initialToken);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Load user info from API. This effect will only run if a user is logged
   * in and have a token. The token will be saved to localStorage. 
   * This will re-run when the user logs out, this means the value of 
   * the token is a dependency for the useEffect.
   */
  useEffect(function loadUserInfoWithToken() {
    console.debug("App useEffect loadUserInfoWithToken",
      "currentUserToken=", currentUserToken);

    // set currentUser token to localStorage
    if (currentUserToken) localStorage.setItem(TOKEN_STORAGE_ID, initialToken)
    const tokenFromLS = localStorage.getItem(TOKEN_STORAGE_ID);
   
    async function getUserFromToken() {
      if (tokenFromLS){
        try {
          // decode the tokenFromLS and get username
          const { username } = jwt.decode(tokenFromLS);

          // save tokenFromLS to API class
          JoblyApi.token = tokenFromLS;

          // make an api request for the user info using the username
          let currentUser1 = await JoblyApi.getUser(username);
          // setCurrentUser based on response of api
          setCurrentUser(currentUser1);
        } catch (err) {
          setError(err);
        } 
        setIsLoading(true);
      }
    }
    setIsLoading(true);
    getUserFromToken();
  }, [currentUserToken])


  /** Reset user state be empty object. */
  function logoutUser() {
    localStorage.removeItem(TOKEN_STORAGE_ID);
    setCurrentUser(null)
    setCurrentUserToken(null);
  }

  async function login(formData) {
    const token = await JoblyApi.login(formData);
    // const userDetail = await JoblyApi.getUser(formData.username);

    // TODO why does this order matter?
    localStorage.setItem('user', token);
    setCurrentUserToken(token);
    // console.log('this is userDetail', userDetail)
  }

  async function signup(formData) {
    const newUserToken = await JoblyApi.signup(formData);

    localStorage.setItem('user', newUserToken);
    setCurrentUserToken(newUserToken);
  }

  // to remember a logged in user, we need a useEffect to get the user via the API using the token
  function showLoadingOrNavbar() {
    if (isLoading) return (<p>Loading...</p>);
    if (error) return (<p> {error} </p>);
  }

  ///testing this line

  return (
    <div className="App">
      {/* <nav class="Navigation navbar navbar-expand-md"> */}
      <BrowserRouter>
        {showLoadingOrNavbar()}
        <UserContext.Provider value={currentUser}>
          <Navbar logoutUser={logoutUser} />
          <Routes signUp={signup}
            login={login}
          />
        </UserContext.Provider>
      </BrowserRouter>
      {/* </nav> */}
    </div>
  );
}

export default App;
