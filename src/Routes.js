import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from './Homepage'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobList from './JobList'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ProfileForm from './ProfileForm'




/** Routes
 * 
 * App -> Routes -> { Homepage, CompanyList, CompanyDetail,
 *  JobList, LoginForm, SignupForm, ProfileForm }
 */
function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/companies">
          <CompanyList />
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignupForm />
        </Route>
        <Route exact path="/profile">
          <ProfileForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;