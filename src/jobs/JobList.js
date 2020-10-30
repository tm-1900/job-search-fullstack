import React, { useEffect, useState } from "react";
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api/api';
import JobCardList from "./JobCardList";

/**
 * Renders JobList.
 *    - by default, all jobs will be shown
 *    - If user types inputs into SearchBox, JobList will be filtered
 *          based on inputs
 *   
 * 
 * - setJobs: received function from parent; will set new jobs list
 *      when user search for a particular job.
 * - jobs: array of job objects 
 *      like [{id, title, salary, equity, companyHandle, companyName}, ...]
 * 
 * State:
 *  - searchJobInput
 *  - error
 *  - isLoading - default True
 * 
 * Routes --> JobList --> {SearchForm, JobCardList}
 */

function JobList() {
  const [jobs, setJobs] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Makes an api request based on search input, 
   *  setJobs with api response.
   */
  useEffect(function fetchSearchedJobs() {
    console.debug("JobList useEffect fetchSearchedJobs");

    searchJobs();
  }, [])

  function searchJobs(formData) {
    setIsLoading(true);

    async function fetchJobs() {
      try {
        const result = await JoblyApi.getJobs(formData)
        if (result.length === 0) {
          throw new Error("Sorry, no results were found!")
        }
        setJobs(result)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }


  /**Handles loading, errors, JobCardList and renders accordingly. */
  function showLoadingOrJobs() {

    if (isLoading) return (<p>Loading...</p>)
    if (error) return (<p> {error} </p>)
    return (<div>
      <JobCardList jobs={jobs} />
    </div>)

  }

  return (
    <div>
      <SearchForm submitSearch={searchJobs} />
      {showLoadingOrJobs()}
    </div>

  )
}

export default JobList;