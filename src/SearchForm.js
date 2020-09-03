import React, { useState } from 'react';

/** SearchForm
 * 
 * State:
 * - formData
 * 
 * Props:
 * - submitSearch: function for passing form data back to Routes
 * 
 * { CompanyList, JobList } --> SearchForm
 */

function SearchForm({ submitSearch }) {
  const initialState = { 
    searchTerm: "",
  }

  const [formData, setFormData] = useState(initialState)


  /** handle form inputs */ 
  //if it's one input don't need setformData()
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  
  function handleSubmit(evt) {
    evt.preventDefault();
    submitSearch(formData);
    setFormData(initialState);
  }

  //other options: aria/label twitter bootstrap
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchTerm"></label>
      <input
        id="SearchForm"
        name="searchTerm"
        value={formData.searchTerm}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  )
}

export default SearchForm;