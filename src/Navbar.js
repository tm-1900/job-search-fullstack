import React from "react";
import { NavLink } from "react-router-dom";
import Homepage from "./Homepage";

/**
 * Render Navbar. 
 * 
 * Prop: 
 *  - userInfo: user info object like { first_name, last_name, email }
 *  - logoutUser function received from parent
 * 
 * App --> Navbar
 */

function Navbar({ userInfo, logoutUser }) {
  console.log('does nav bar run')
  //if logged in: create NavLink for Jobly(homepage), Companies, 
  //Jobs, Profile, Signout (logout tram)

  const loggedIn = (
    <nav>
      <NavLink to="/"> Jobly </NavLink>
      <NavLink to="/companies"> Companies </NavLink>
      <NavLink to="/jobs"> Jobs </NavLink>
      <NavLink to="/profile"> Profile </NavLink>
      <NavLink to="/signout"> Signout</NavLink>
      {/* <NavLink to={`/logout ${userInfo.first_name}`}> */}
      {/* //onclick to logoutUser */}
      {/* </NavLink> */}
    </nav>
  )

  //if not logged in: Jobly(homepage), Login SignUp { && }
  const notLoggedIn = (
    <nav>
      <NavLink to="/"> Homepage </NavLink>
      <NavLink to="/login"> Login </NavLink>
      <NavLink to="/signup"> Signup</NavLink>
    </nav>
  )


  return (
    <nav>
      {loggedIn}

    </nav>
  )
}

export default Navbar;