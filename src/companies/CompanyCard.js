import React from 'react';
import { Link } from 'react-router-dom';

/** CompanyCard
 * 
 * Props:
 * - company: object about a company like {handle, name, description, numEmployees, logoUrl}
 * 
 * CompanyList --> CompanyCard
 */
function CompanyCard({ handle, name, description, logoUrl }) {
  //Be careful about passing down entire company object because of sensitive info;
  // sometimes may be good to pass down only certain parts.

  return (
    <div className="CompanyCard">
      <Link className="CompanyCard card" to={`/companies/${handle}`} >
        <div className="card-body">
          <h6 className="card-title">{name}
            {logoUrl && <img src={logoUrl}
              alt={name}
              className="float-left ml-5" />}</h6>
          <p>{description}</p>
        </div>
      </Link>

    </div>
  );
}

export default CompanyCard;
