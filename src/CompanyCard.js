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