import React from "react";


/**
 * Props:
 * - searchJobs: search function received from parent,
 *   passed to SearchForm
 * - jobs: array of job objects like 
 *   [{id, title, salary, equity, companyHandle, companyName}, ...]
 * 
 * Routes --> JobList --> {SearchForm, JobCardList}
 */
function JobList({ searchJobs, jobs }) {

  // renders JobCard based on jobs
  return (
    <p>JobList</p>
  )
}

export default JobList;