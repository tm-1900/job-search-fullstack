import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import CompanyCard from './CompanyCard';
import SearchForm from '../common/SearchForm';


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
 *  - companies
 *  - isLoading - default True
 * 
 * Routes --> CompanyList --> { SearchForm, CompanyCard }
 */

function CompanyList() {
  console.debug("this is CompanyList")

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.debug("CompanyList useEffect companies", companies);

  /** Makes an axios API request based on search input,
   *  fetchSearchedCompanies with api response.
   *  Return companies based on search inputs.  
   * 
   * */
  useEffect(function fetchSearchedCompanies() {
    console.debug("CompanyList useEffect fetchSearchedCompanies");

    searchCompanies();
  }, [])

  function searchCompanies(formData){
    setIsLoading(true);

    async function fetchCompanies(){
      try{
        const result = await JoblyApi.getCompanies(formData);
        console.debug("CompanyList useEffect resultresultresultresult", result);
        setCompanies(result);
        setIsLoading(false);
      }catch(error){
        throw new Error("Sorry, no results were found!")
      }
    }
    fetchCompanies();
  }

  const loadCompanies = isLoading ? (<p>Loading...</p>) : (
    <div className="CompanyList-list">
      {companies.map(company => (
        <CompanyCard
          key={company.handle}
          handle={company.handle}
          name={company.name}
          description={company.description}
          logoUrl={company.logoUrl}
        />
      ))}
    </div>
  ) 

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm submitSearch={searchCompanies} />
      {loadCompanies}
    </div>
    )
}


export default CompanyList;
