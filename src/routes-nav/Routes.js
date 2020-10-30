import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import PrivateRoute from "./PrivateRoute";



/** Routes
 * 
 * State:
 * - companies: default array of company objects 
 *      like [{handle, name, description, numEmployees, logoUrl},...]
 * - jobs: default array of job objects
 *      like [{id, title, salary, equity}...]
 * 
 * App -> Routes -> { Homepage, CompanyList, CompanyDetail,
 *  JobList, LoginForm, SignupForm, ProfileForm }
 * 
 * <PrivateRoute> will show certain components depending on whether a user is 
 * logged in. These components will be wrapped in <PrivateRoutes> instead of <Routes>
 */
function Routes({ login, signup }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `signup=${typeof signup}`,
  );


  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute >

        <PrivateRoute exact path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs">
          <JobList />

        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <ProfileForm/>
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>

    </div>


  )
}

export default Routes;