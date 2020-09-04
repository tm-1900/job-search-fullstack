import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
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
  // console.log('does Navbar run')

  const currentUser = useContext(UserContext);
  const username = currentUser?.username;
  // console.log('currentUser Navbar', currentUser)

  const history = useHistory();
  
  function handleClick(evt){
    logoutUser();
    history.push("/");
  }


  const loggedIn = (
    <nav>
      <NavLink to="/"> Jobly </NavLink>
      <NavLink to="/companies"> Companies </NavLink>
      <NavLink to="/jobs"> Jobs </NavLink>
      <NavLink to="/profile"> Profile </NavLink>
      <Link onClick={handleClick}> Logout {username} </Link>
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