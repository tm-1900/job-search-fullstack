import React, { useState } from 'react';

/** JobCard
 * 
 * Props:
 * - job: object about a job 
 *          like {title, salary, equity}
 * 
 * State:
 *  - appliedStatus, false by default
 * 
 * JobCardList --> JobCard
 */
function JobCard({ job }) {
  const [applyStatus, setApplyStatus] = useState(false);


  function handleClick(evt){
    setApplyStatus(true);
  }

  return (
    <div className="JobCard">
      <p> {job.title} </p>
      <p>{job.companyName}</p>
      <p>Salary: {job.salary}</p>
      <p>equity: {job.equity}</p>

      {!applyStatus && <button onClick={handleClick} >Apply</button>}
      {applyStatus && <button disabled>Applied</button>}
      
    </div>
  )
}

export default JobCard;