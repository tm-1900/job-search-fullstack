import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm'


/**
 * Renders CompanyList.
 *    - by default, all companies will be shown
 *    - If user types inputs into SearchBox, CompanyList will be filtered
 *          based on inputs
 *    - A click on company card will redirect user to /companies/:handle
 * 
 * Props: 
 * - setCompanies: received function from parent; will set new company list 
 *      when user search for a particular company.
 * - companies: array of company objects 
 *              like [{handle, name, description, numEmployees, logoUrl},...]
 * 
 * State: 
 *  - searchCompanyInput
 *  - error
 * 
 * Routes --> CompanyList --> { SearchForm, CompanyCard }
 */

function CompanyList({ companies, setCompanies }) {
  // console.log("this is companies", companies)

  const [searchCompanyInput, setSearchCompanyInput] = useState({});
  const [error, setError] = useState(null);

  /**Return companies based on search inputs */
  useEffect(function fetchSearchedCompanies() {
    async function fetchCompanies() {
      // console.log("fetchCompanies ran")
      let result;
      try {
        result = await JoblyApi.getCompaniesWithFilter(searchCompanyInput)
        // console.log("this is result in fetchSearchedCompanies", result)

        if (result.length === 0) {
          throw new Error("Sorry, no results were found!")
        }

        setCompanies(result)
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCompanies();
  }, [searchCompanyInput, setCompanies])


  /** Gets data from SearchForm on CompanyList page, 
   *  makes an api request based on search input,
   *  setSearchCompanyInput with api response. */
  function searchCompanies(formData) {
    // console.log("searchCompanies ran")
    setSearchCompanyInput(formData);
  }

  function showLoadingOrCompanies() {

    if (companies === null){
      return (<p>Loading...</p>)
    } else if (error) {  //Todo. ask about error message 
      return (<p> {error} </p>)
    } else {
      return (
        <>
          {companies.map((c) => <CompanyCard key={c.handle} company={c} />)}
        </>
      )
    }
  }

  return (
    <div>
      <SearchForm submitSearch={searchCompanies} />
      {showLoadingOrCompanies()}
    </div>
  )
}

export default CompanyList;