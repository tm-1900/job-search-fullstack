import React from 'react';

/**
 * Props:
 * - searchCompanies: search function received from parent,
 *   passed to SearchForm 
 * - companies: array of company objects like 
 *   [{handle, name, description, numEmployees, logoUrl},...]
 * 
 * Routes --> CompanyList --> { SearchForm, CompanyCard }
 */

function CompanyList({ companies, searchCompanies }){

  // renders CompanyCard based on companies
  // clicking on a CompanyCard will redirect to /companies/:handle
  return(<p>CompanyList</p>)
}

export default CompanyList;