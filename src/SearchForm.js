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
    name: "",
  }
  const [formData, setFormData] = useState(initialState)

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
    <form onSubmit={handleSubmit}>
      <input
        id="SearchForm"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  )
}

export default SearchForm;