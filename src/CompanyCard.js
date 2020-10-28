import React from 'react';
import { Link } from 'react-router-dom';

/** CompanyCard
 * 
 * Props:
 * - company: object about a company like {handle, name, description, numEmployees, logoUrl}
 * 
 * CompanyList --> CompanyCard
 */
function CompanyCard({ company}) {
  const { handle, name, description, logoUrl } = company
  
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${handle}`} >
        {name} </Link>
      
      <p>{description}</p>
      <img src={logoUrl} alt={name} />
    </div>
  )
}

export default CompanyCard;