import React, { useState } from "react";
import JoblyApi from './api';


/**
 * State:
 * - company: object about this company from JoblyApi.getCompany method like
 * {handle, name, description, numEmployees, logoURL, jobs}
 * 
 * Routes --> CompanyDetail --> JobCardList
 */

function CompanyDetail(){
  // useParams to grab handle to search for jobs within this company
  const [company, setCompany] = useState(JoblyApi.getCompany()); //  TODO make this not call every time function runs

  // pass company.jobs to JobCardList as props
  return(
    <p>CompanyDetail</p>
  )
}

export default CompanyDetail;