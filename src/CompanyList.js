import React from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm'


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
  // have a SearchBox 
  // console.log("this is companies", companies)

  function showLoadingOrCompanies() {
    if (companies !== null) {
      return (
        <>
          {companies.map(c => <CompanyCard company={c} />)}
        </>
      )
    } else {
      return <p>Loading...</p>
    }
  }

  return(
    <div>
      <SearchForm submitSearch={searchCompanies} />
      {showLoadingOrCompanies()}
    </div>
  )
}

export default CompanyList;