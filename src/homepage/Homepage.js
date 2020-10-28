import React from 'react';
import UserContext from '../auth/UserContext';
import "./Homepage.css"

/**
 * Renders homepage of site.
 * 
 * Either show welcome message or login/register button.
 * 
 * Routes at /
 * 
 * App --> Routes --> Homepage
 */

function Homepage() {
  //const { currentUser } = UserContext(UserContext);
  //console.debug("Homepage", "currentUser=", currentUser);

  // function for checking if firstName is not undefined
  // if it is undefined, return login & signup buttons
  // else return "welcome back"
  function showButtonsOrWelcomeBackMsg() {

  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h3> Let's start your <h1 className="mb-4 font-weight-bold">JobSearch</h1></h3>

      </div>
    </div>
    )
}

export default Homepage;