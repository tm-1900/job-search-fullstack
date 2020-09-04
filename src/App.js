import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from './UserContext';
import JoblyApi from "./api";
import { BrowserRouter } from "react-router-dom"
import Navbar from './Navbar'

import jwt from "jsonwebtoken"


/**
 * State:
 * - currentUser
 * - currentUserToken
 * 
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserToken, setCurrentUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //console.log('this is current user App', currentUser)
  //console.log('this is token', currentUserToken)


  useEffect(function getCurrentUserFromToken() {
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
    const token = await JoblyApi.getToken(formData);

    localStorage.setItem('user', token);
    setCurrentUserToken(token);
    // console.log('this is userDetail', userDetail)
  }

  async function signUp(formData) {
    const newUserToken = await JoblyApi.registerUser(formData);

    localStorage.setItem('user', newUserToken);
    setCurrentUserToken(newUserToken);
  }


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
          <Routes signUp={signUp}
            login={login}
          />
        </UserContext.Provider>
      </BrowserRouter>
      {/* </nav> */}
    </div>
  );
}

export default App;
