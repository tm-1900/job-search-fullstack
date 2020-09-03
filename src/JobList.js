import React, { useEffect, useState } from "react";
import SearchForm from './SearchForm';
import JobCard from './JobCard';
import JoblyApi from './api';
import JobCardList from "./JobCardList";

//todo. change joblist to jobslist
/**
 * Renders JobList.
 *    - by default, all jobs will be shown
 *    - If user types inputs into SearchBox, JobList will be filtered
 *          based on inputs
 *   
 * Props:
 * - setJobs: received function from parent; will set new jobs list
 *      when user search for a particular job.
 * - jobs: array of job objects 
 *      like [{id, title, salary, equity, companyHandle, companyName}, ...]
 * 
 * State:
 *  - searchJobInput
 *  - error
 * 
 * Routes --> JobList --> {SearchForm, JobCardList}
 */

function JobList({ jobs, setJobs }) {
  console.log("this this jobslist", jobs)

  const [searchJobInput, setSearchJobInput] = useState({});
  const [error, setError] = useState(null);


  /** Gets data from SearchForm on JobList page, 
    */
  function searchJobs(formData) {
    // console.log("searchJobs ran")
    setSearchJobInput(formData);

  }

  /**
   * Makes an api request based on search input, 
   *  setJobs with api response.
   */
  useEffect(function fetchSearchedJobs() {
    async function fetchJobs() {
      let result;
      try {
        result = await JoblyApi.getJobsWithFilter(searchJobInput)
        //console.log("this is search input", searchJobInput)
        //console.log("this is result in fetchSearchedJobs", result)

        if (result.length === 0) {
          throw new Error("Sorry, no results were found!")
        }

        setJobs(result)
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJobs();

  }, [setJobs, searchJobInput])


  /**Handles loading, errors, JobCardList and renders accordingly. */
  function showLoadingOrJobs() {

    if (jobs === null) return (<p>Loading...</p>)
    else if (error) return (<p> {error} </p>)
    else return ( <div> 
                        <JobCardList jobs={jobs}/> 
                  </div>)
    
  }

  // renders JobCard based on jobs inputs
  //submitSearch passed a a prop from SearchForm, feeding it searchJobs function
  return (
    <div>
      <SearchForm submitSearch={searchJobs} />
      {showLoadingOrJobs()}
    </div>

  )
}

export default JobList;