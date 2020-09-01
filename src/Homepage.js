import React from 'react';

/**
 * Render homepage.
 * 
 * Props:
 * - firstName: user's first name or undefined if not logged in
 * 
 * App --> Routes --> Homepage
 */

function Homepage({ firstName }){

  // function for checking if firstName is not undefined
  // if it is undefined, return login & signup buttons
  // else return "welcome back"
  function showButtonsOrWelcomeBackMsg() {

  }

  return (<p>This is homepage</p>)
}

export default Homepage;