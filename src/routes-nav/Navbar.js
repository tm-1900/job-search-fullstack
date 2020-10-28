import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from '../auth/UserContext';
import { useHistory } from "react-router-dom";


/**
 * Render Navbar. 
 * 
 * Prop: 
 *  - logoutUser: function received from parent
 * 
 * If user is logged in, show main area of the site. If not logged in, 
 * show log in and singup forms.
 * 
 * App --> Navbar
 */

function Navbar({ logoutUser }) {
  const {currentUser} = useContext(UserContext);
  console.debug("logoutUser", logoutUser)
  
  const username = currentUser?.username;


  const history = useHistory();
  
  function handleClick(evt){
    logoutUser();
    history.push("/");
  }


  const loggedIn = (
    <nav>
      <NavLink to="/"> JobSearch </NavLink>
      <NavLink to="/companies"> Companies </NavLink>
      <NavLink to="/jobs"> Jobs </NavLink>
      <NavLink to="/profile"> Profile </NavLink>
      <button onClick={handleClick}> Logout {username}</button>
    </nav>
  )

  const notLoggedIn = (
    <nav>
      <NavLink to="/">  </NavLink>
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