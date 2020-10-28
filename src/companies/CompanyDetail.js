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
  // useParams to grab handle to search for jobs within this company
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
        console.log('this is result', result)
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
    <div>
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );


  // pass company.jobs to JobCardList as props
  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      {error ? <p> {error}</p> : showLoadingOrCompany}
    </div>
  )
}

export default CompanyDetail;