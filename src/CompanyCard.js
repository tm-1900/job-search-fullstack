import React from 'react';

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
      <b>{company.name}</b>
      <p>{company.description}</p>
      <img src={company.logoUrl} alt={company.name} />
    </div>
  )
}

export default CompanyCard;