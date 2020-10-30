import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../auth/UserContext";
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
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  // function for checking if firstName is not undefined
  // if it is undefined, return login & signup buttons
  // else return "welcome back"
  const showButtonsOrWelcomeBackMsg = currentUser ? 
          <h3>Welcome back, {currentUser.firstName}!</h3> 
          : <p>
            <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary font-weight-bold mr-3" to="/signup">
              Sign Up
            </Link>
          </p>

  

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h3> Let's start your</h3>
        <h1 className="mb-4 font-weight-bold"> JobSearch</h1>
        {showButtonsOrWelcomeBackMsg}
      </div>
    </div>
  )
}

export default Homepage;