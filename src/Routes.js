import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from './Homepage'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobList from './JobList'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ProfileForm from './ProfileForm'
import JoblyApi from './api'


/** Routes
 * 
 * State:
 * - user: object of user details like {username, firstName, lastName, email}
 * - companies: default array of company objects like 
 *   [{handle, name, description, numEmployees, logoUrl},...]
 * 
 * App -> Routes -> { Homepage, CompanyList, CompanyDetail,
 *  JobList, LoginForm, SignupForm, ProfileForm }
 */
function Routes() {
  const [user, setUser] = useState({}); // when user logs in, fill in details
  const [companies, setCompanies] = useState(JoblyApi.getCompaniesWithFilter);
  const [jobs, setJobs] = useState(JoblyApi.getJobsWithFilter);

  /** Gets data from LoginForm, makes an api request for that user,
   * if valid, setUser with api response. */
  function loggedInUser() {

  }

  /** Gets data from SearchForm on CompanyList page, 
   *  makes an api request based on search input,
   *  setCompanies with api response. */
  function searchCompanies() {

  }

  /** Gets data from SearchForm on JobList page, 
   *  makes an api request based on search input,
   *  setJobss with api response. */
  function searchJobs() {

  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Homepage firstName={user.firstName} />
        </Route>
        <Route exact path="/companies">
          <CompanyList searchCompanies={searchCompanies} companies={companies} />
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList searchJobs={searchJobs} jobs={jobs} />
        </Route>
        <Route exact path="/login">
          <LoginForm loggedInUser={loggedInUser} />
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