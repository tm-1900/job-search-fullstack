import React from 'react';
import { Link } from 'react-router-dom';

/** CompanyCard
 * 
 * Props:
 * - company: object about a company like {handle, name, description, numEmployees, logoUrl}
 * 
 * CompanyList --> CompanyCard
 */
function CompanyCard({ company }) {
  //Be careful about passing down entire company object because of sensitive info;
    // sometimes may be good to pass down only certain parts.

  return (
    <div className="CompanyCard">
      <Link to={`/companies/${company.handle}`} >
        {company.name} </Link>
      
      <p>{company.description}</p>
      <img src={company.logoUrl} alt={company.name} />
    </div>
  )
}

export default CompanyCard;