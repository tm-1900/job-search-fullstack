import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from './UserContext';
import JoblyApi from "./api";
import { BrowserRouter } from "react-router-dom"



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

  async function login(formData) {
    const token = await JoblyApi.getToken(formData);
    const userDetail = await JoblyApi.getUser(formData.username);

    setCurrentUserToken(token);
    setCurrentUser(userDetail);
  }

  return (
    <div className="App">
      {/* <nav class="Navigation navbar navbar-expand-md"> */}
      <BrowserRouter>
        <UserContext.Provider value={currentUser} >
          <Routes logoutUser={logoutUser} login={login}/>
        </UserContext.Provider>
      </BrowserRouter>
      {/* </nav> */}
    </div>
  );
}

export default App;
