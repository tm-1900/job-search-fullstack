import React, { useState, useEffect } from "react";
import JoblyApi from './api';
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";


/**
 * State:
 * - company: object about this company 
 *            like {handle, name, description, numEmployees, logoURL, jobs}
 *           - company state received from JoblyApi.getCompany()
 * - error
 * 
 * Routes --> CompanyDetail --> JobCardList
 */

function CompanyDetail() {
  // useParams to grab handle to search for jobs within this company
  const { handle } = useParams()

  //Todo. what's the diff between null and {}
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  /**Fetch companies from API based on search inputs */
  useEffect(function fetchClickedCompany() {
    async function fetchCompany() {
      try {
        const result = await JoblyApi.getCompany(handle);
        setCompany(result);
      } catch (err) {
        setError(err.message)
      }
    }
    fetchCompany();
  }, [handle, setCompany]);

  /** Handles loading, errors, and JobCardList, and renders accordingly. */
  function showLoadingOrCompany(){
    if (company === null) {
      return (<p>Loading...</p>)
    } else if (error) {
      return (<p> Error! {error}</p>)
    } else {
      return (
        <div>
          <h4>{company.name}</h4>
          <p>{company.description}</p>
          <JobCardList jobs={company.jobs} />
        </div>
      )
    }
  }

  // pass company.jobs to JobCardList as props
  return (
    <div>
      {showLoadingOrCompany()}
    </div>
  )
}

export default CompanyDetail;