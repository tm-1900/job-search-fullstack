import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from './UserContext';
import JoblyApi from "./api";



function App() {
  //add token as state
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserToken, setCurrentUserToken] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  


  /** Reset user state be empty object. */
  function logoutUser() { }


  /** 
   * Get data from SignupFrom, makes an api request to add user
   * into db.
   */

  function signupUser() { }


  return (
    <div className="App">
      {/* <nav class="Navigation navbar navbar-expand-md"> */}
      <UserContext.Provider value={currentUser} >
        <Routes setCurrentUserToken={setCurrentUserToken} logoutUser={logoutUser} signupUser={signupUser}/>
      </UserContext.Provider>
      {/* </nav> */}
    </div>
  );
}

export default App;
