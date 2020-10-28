import React, { useState, useContext } from 'react';
import UserContext from "../auth/UserContext";

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
function JobCard({ id, title, salary, equity, companyName }) {
  //const {hasAppliedToJob, applyToJob} = useContext(UserContext)
  const [applyStatus, setApplyStatus] = useState(false);

  // React.useEffect(function appliedStatusUpdate(){
  //   setApplyStatus(hasAppliedToJob(id));
  // }, [id, hasAppliedToJob])


  // function apply(){
  //   applyToJob(id);
  //   setApplyStatus(true)
  // }


  function handleClick(evt){
    setApplyStatus(true);
  }

  return (
    <div className="JobCard">
      <p> {title} </p>
      <p>{companyName}</p>
      <p>Salary: {salary}</p>
      <p>equity: {equity}</p>

      {!applyStatus && <button onClick={handleClick} >Apply</button>}
      {applyStatus && <button disabled>Applied</button>}
      
    </div>
  )
}

export default JobCard;