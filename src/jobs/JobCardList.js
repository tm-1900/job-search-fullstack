import React from "react";
import JobCard from "../jobs/JobCard";


/**
 * Render a list of JobCards.
 * 
 * Props: 
 *    - jobs
 * 
 * JobList -> JobCardList --> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 */
function JobCardList({jobs}){
  console.debug("JobCardList", "jobs=", jobs);

  const jobCards = jobs.map(job => <JobCard key={job.id}
                                            id={job.id}
                                            title={job.title}
                                            salary={job.salary}
                                            equity={job.equity}
                                            companyName={job.companyName} />)

  return(<div>
    {jobCards}
    </div>)
}

export default JobCardList;