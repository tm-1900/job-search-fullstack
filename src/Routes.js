import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Homepage from './Homepage'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobList from './JobList'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ProfileForm from './ProfileForm'
import JoblyApi from './api'
import Navbar from './Navbar'


/** Routes
 * 
 * State:
 * - user: object of user details like {username, firstName, lastName, email}
 * - companies: default array of company objects 
 *      like [{handle, name, description, numEmployees, logoUrl},...]
 * - jobs: default array of job objects
 *      like [{id, title, salary, equity}...]
 * 
 * App -> Routes -> { Homepage, CompanyList, CompanyDetail,
 *  JobList, LoginForm, SignupForm, ProfileForm }
 * 
 */
function Routes({setCurrentUserToken, logoutUser, signupUser}) {
  const [user, setUser] = useState({}); // when user logs in, fill in details
  const [companies, setCompanies] = useState([{}]);
  const [jobs, setJobs] = useState([{}]);


  /**Fetch companiesList */
  useEffect(function initialFetchCompanies() {
    async function fetchCompanies() {
      const result = await JoblyApi.getCompanies()
      setCompanies(result);
    }
    fetchCompanies()
  }, [])

  

  /**
   * Get data from ProfileForm, make api request to update user info.
   * SetUser with new info.
   */

   function updateUser(){

   }


  return (
    <BrowserRouter>
      <Navbar userInfo={user} logoutUser={logoutUser} />
      <Switch>

        <Route exact path="/">
          <Homepage first_name={user.first_name} />
        </Route>
        <Route exact path="/companies">
          <CompanyList companies={companies} setCompanies={setCompanies}/>
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList jobs={jobs} setJobs={setJobs} />
        </Route>
        <Route exact path="/profile">
          <ProfileForm updateUser={updateUser} userInfo={user}/>
        </Route>

        <Route exact path="/login">
          <LoginForm setCurrentUserToken={setCurrentUserToken} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signupUser={signupUser} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;