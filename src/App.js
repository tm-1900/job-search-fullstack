import React from 'react';
import './App.css';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.css";

function App() {
  //add token as state
  //state for currentUser

  //useEffect get backend info and store token


  /** Gets data from LoginForm, makes an api request for that user,
 * if valid, setUser with api response. */
  function loggedInUser() {

  }

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
      <Routes />
      {/* </nav> */}
    </div>
  );
}

export default App;
