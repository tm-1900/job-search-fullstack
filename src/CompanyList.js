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
 *  - isLoading - default True
 * 
 * Routes --> CompanyList --> { SearchForm, CompanyCard }
 */

function CompanyList({ companies, setCompanies }) {
  console.log("this is companies", companies)

  const [searchCompanyInput, setSearchCompanyInput] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  /** Makes an axios API request based on search input,
   *  setSearchCompanyInput with api response. 
   *  Return companies based on search inputs.  
   * 
   * */
  useEffect(function fetchSearchedCompanies() {
    async function fetchCompanies() {
      // console.log("fetchCompanies ran")
      let result;
      try {
        result = await JoblyApi.getCompanies(searchCompanyInput)

        if (result.length === 0) {
          throw new Error("Sorry, no results were found!")
        }

        setCompanies(result)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false)

      }
    }
    fetchCompanies();
  }, [searchCompanyInput, setCompanies])


  /** Get formData from SearchForm on CompanyList page. 
   */
  function searchCompanies(formData) {

    setSearchCompanyInput(formData);
  }

  /**Handles loading, errors, JobCardList and renders accordingly. 
   */
  function showLoadingOrCompanies() {
    if (isLoading) return (<p>Loading...</p>);
    if (error) return (<p> {error} </p>);
    return (<div> {companies.map((c) => <CompanyCard key={c.handle} company={c} />)} </div>)
  }

  return (
    <div>
      <SearchForm submitSearch={searchCompanies} />
      {showLoadingOrCompanies()}
    </div>
  )
}

export default CompanyList;

// console.log("searchCompanies ran")
// console.log("this is result in fetchSearchedCompanies", result)