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
 * - isLoading - default True
 * Routes --> CompanyDetail --> JobCardList
 */

function CompanyDetail() {
  const { handle } = useParams()

  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  /**Fetch companies from API based on search inputs 
  */
  useEffect(function fetchClickedCompany() {
    async function fetchCompany() {
      try {
        const result = await JoblyApi.getCompany(handle);
        setCompany(result);
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompany();
  }, [handle, setCompany]);


  /** Handles loading, errors, and JobCardList, and renders accordingly. */
  function showLoadingOrCompany() {

    if (isLoading) return <p>Loading...</p>
    if (error) return <p> Error! {error}</p>

    return (<div>
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>)
  }

  return (
    <div>
      {showLoadingOrCompany()}
    </div>
  )
}

export default CompanyDetail;