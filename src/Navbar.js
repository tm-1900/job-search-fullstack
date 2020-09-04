import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from './UserContext';
import { useHistory } from "react-router-dom";


/**
 * Render Navbar. 
 * 
 * Prop: 
 *  - userInfo: user info object like { first_name, last_name, email }
 *  - logoutUser function received from parent
 * 
 * App --> Navbar
 */

function Navbar({ logoutUser }) {
  console.log('does nav bar run')

  const {currentUser} = useContext(UserContext);
  console.log('currentUser Navbar', currentUser)

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
      <button onClick={handleClick}> Logout {currentUser} </button>
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
      {(currentUser !== undefined) && loggedIn}
      {(currentUser === undefined) && notLoggedIn}

    </nav>
  )
}

export default Navbar;