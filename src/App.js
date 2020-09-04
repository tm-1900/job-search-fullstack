import React, { useState } from 'react';
import './App.css';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from './UserContext';
import JoblyApi from "./api";
import { BrowserRouter } from "react-router-dom"
import Navbar from './Navbar'



function App() {
  //add token as state
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserToken, setCurrentUserToken] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('this is current user App', currentUser)
  //console.log('this is token', currentUserToken)

  /** Reset user state be empty object. */
  function logoutUser() {
    setCurrentUser({});
    setCurrentUserToken({});
  }

  async function login(formData) {
    const token = await JoblyApi.getToken(formData);
    const userDetail = await JoblyApi.getUser(formData.username);
    
    setCurrentUserToken(token);
    setCurrentUser(userDetail);
    console.log('this is userDetail', userDetail)
  }


  async function signUp(formData){
    const newUserToken = await JoblyApi.registerUser(formData);

    setCurrentUserToken(newUserToken);
    setCurrentUser(formData)
  }

  
  return (
    <div className="App">
      {/* <nav class="Navigation navbar navbar-expand-md"> */}
      <BrowserRouter>
        <UserContext.Provider value={{currentUser}} >
          <Navbar />
          <Routes logoutUser={logoutUser} 
                  signUp={signUp}
                  login={login}
            />
        </UserContext.Provider>
      </BrowserRouter>
      {/* </nav> */}
    </div>
  );
}

export default App;
