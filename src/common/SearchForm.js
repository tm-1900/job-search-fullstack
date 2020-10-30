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
  console.debug("SearchForm", "searchFor=", typeof searchFor);
  const initialState = { searchTerm: "" }

  const [formData, setFormData] = useState(initialState)


  /** handle form inputs */ 
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


  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchTerm"></label>
        <input
          id="SearchForm"
          name="searchTerm"
          value={formData.searchTerm}
          onChange={handleChange}
          placeholder="Search for jobs..."
        />
        <button type="submit" className="btn btn-sm btn-primary">Submit</button>
      </form>
    </div>
    
  )
}

export default SearchForm;