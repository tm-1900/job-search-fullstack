import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm'


/**
 * Renders CompanyList.
 *    - By default, all companies will be shown.
 *    - If user types inputs into SearchBox, CompanyList will be filtered
 *          based on inputs.
 *    - A click on company card will redirect user to /companies/:handle
 * 
 * Props: 
 * - setCompanies: function received from parent; will set new company list 
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
  //todo. can we use this instead of checking if company is null?
  const [isLoading, setIsLoading] = useState(true);


  /** Makes an axios API request based on search input,
   *  setSearchCompanyInput with api response. 
   *  Return companies based on search inputs.  */
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


  /** Get formData from SearchForm on CompanyList page. */
  function searchCompanies(formData) {
    // console.log("searchCompanies ran")
    setSearchCompanyInput(formData);
  }

  //Todo. ask about error message     
  /**Handles loading, errors, JobCardList and renders accordingly. */
  function showLoadingOrCompanies() {
    const companyCards = companies.map((c) => <CompanyCard key={c.handle} company={c} />)

    if (companies === null) return (<p>Loading...</p>);
    else if (error) return (<p> {error} </p>);
    else return (<div>{companyCards}</div>)
  }

  return (
    <div>
      <SearchForm submitSearch={searchCompanies} />
      {showLoadingOrCompanies()}
    </div>
  )
}

export default CompanyList;