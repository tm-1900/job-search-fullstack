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

    async function getUserFromToken() {
      try {
        const token = localStorage.getItem('user');
        JoblyApi.token = token

        // decode the token and get username
        const user = jwt.decode(token);
        console.log("this is user in getUserFromToken", user)

        if (user) {
          // make an api request for the user info using the username
          const userDetail = await JoblyApi.getUser(user.username)
          console.log("this is userDetail", userDetail)

          // setCurrentUser to response of api
          setCurrentUser(userDetail);
        }

      } catch (err) {
        setError(err);
        console.log("this is err in getUserFromToken", err)
      } finally {
        setIsLoading(false);
      }
    }
    getUserFromToken();
  }, [currentUserToken])

  /** Reset user state be empty object. */
  function logoutUser() {
    setCurrentUserToken(null);
    setCurrentUser(null)
    localStorage.removeItem('user');
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
