import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from './UserContext';
import { useHistory } from "react-router-dom";


/**
 * Render Navbar. 
 * 
 * Prop: 
 *  - logoutUser: function received from parent
 * 
 * App --> Navbar
 */

function Navbar({ logoutUser }) {
  // console.log('does nav bar run')

  const currentUser = useContext(UserContext);
  const username = currentUser?.username;
  // console.log('currentUser Navbar', currentUser)

  const history = useHistory();
  
  function handleClick(evt){
    logoutUser();
    history.push("/");
  }


  // NavLink to="#"
  const loggedIn = (
    <nav>
      <NavLink to="/"> Jobly </NavLink>
      <NavLink to="/companies"> Companies </NavLink>
      <NavLink to="/jobs"> Jobs </NavLink>
      <NavLink to="/profile"> Profile </NavLink>
      <button onClick={handleClick}> Logout {username} (just pretend it looks like a link)</button>
    </nav>
  )

  const notLoggedIn = (
    <nav>
      <NavLink to="/"> Homepage </NavLink>
      <NavLink to="/login"> Login </NavLink>
      <NavLink to="/signup"> Signup</NavLink>
    </nav>
  )

  return (
    <nav>
      {(username !== undefined) && loggedIn}
      {(username === undefined) && notLoggedIn}
    </nav>
  )
}

export default Navbar;