import React, { useState, useEffect } from "react";
import JoblyApi from '../api/api';
import { useParams } from "react-router-dom";
import JobCardList from "../jobs/JobCardList";


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
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  /**Fetch companies from API based on search inputs */
  useEffect(function fetchClickedCompany() {
    async function fetchCompany() {
      try {
        const result = await JoblyApi.getCompany(handle);
        console.debug("fetchClickedCompany", "result=", result);
        setCompany(result);
      } catch (err) {
        setError(err[0])
      }finally{
        setIsLoading(false);
      }
    }
    fetchCompany();
  }, [handle]);

  /** Handles loading, errors, and JobCardList, and renders accordingly. 
   */
  const showLoadingOrCompany = (isLoading ? <p>Loading...</p> :
    <div >
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );


  return (
    <div className="CompanyDetail">
      {error ? <p> {error}</p> : showLoadingOrCompany}
    </div>
  )
}

export default CompanyDetail;