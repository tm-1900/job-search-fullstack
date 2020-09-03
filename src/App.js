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

  //console.log('this is token', currentUserToken)
  //console.log('this is currentUser', currentUser)


  /** Reset user state be empty object. */
  function logoutUser() { }


  return (
    <div className="App">
      {/* <nav class="Navigation navbar navbar-expand-md"> */}
      <UserContext.Provider value={currentUser} >
        <Routes setCurrentUserToken={setCurrentUserToken} 
                setCurrentUser={setCurrentUser}
                logoutUser={logoutUser} />
      </UserContext.Provider>
      {/* </nav> */}
    </div>
  );
}

export default App;
