import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from '../auth/UserContext';
import "./Navbar.css";


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
  const { currentUser } = useContext(UserContext);
  console.debug("Navbar", "currentUser=", currentUser);

  //const history = useHistory();

  // function handleClick(evt) {
  //   logoutUser();
  //   history.push("/");
  // }


  function loggedInNavDisplay() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink to="/companies"> Companies
            </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink to="/jobs"> Jobs
            </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink to="/profile"> Profile
            </NavLink>
        </li>
        <li className="nav-item mr-4">
          <Link className="nav-link" to="/" onClick={logoutUser}>
            Logout {currentUser}
          </Link>
        </li>
      </ul>
    );

  }

  function notLoggedInNavDisplay() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink to="/login"> Login </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink to="/signup"> Signup</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        JobSearch
      </Link>
      {currentUser ? loggedInNavDisplay() : notLoggedInNavDisplay()}
    </nav>
  )
}

export default Navbar;