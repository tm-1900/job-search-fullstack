import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect} from "react-router-dom";
import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail'; 
import JobList from '../jobs/JobList';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import JoblyApi from '../api/api'
import UserContext from '../auth/UserContext';



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
 */
function Routes({ login, logoutUser, signUp}) {
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
    <>
      <Switch>
        <Route exact path="/">
          <Homepage />
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
          <ProfileForm updateUser={updateUser} />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signUp={signUp} />
        </Route>


        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default Routes;