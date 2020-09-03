import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get company based on search parameters given, 
   *      if none given, return all companies.
   * 
   * Return companies like [{handle, name, description, numEmployees, logoUrl},...]
   * 
   * Data is an object like {minEmployees, maxEmployees, nameLike}
   */

  static async getCompaniesWithFilter(data = {}) {
    // send this as data instead of using query string
    const p = {
      minEmployees: data.minEmployees,
      maxEmployees: data.maxEmployees,
      name: data.name,
    }
    
    let res;
    if (p.name === "") {
      res = await this.request('companies')
    } else {
      res = await this.request('companies', p)
    }
    console.log("this is res in getCompaniesWithFilter", res.companies)
    
    return res.companies
  }


  /** Get job details by id 
   * 
  */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`)
    return res.job;
  }


  /** Get job based on search parameters given, 
   * if none given, return all jobs.
   */
  static async getJobsWithFilter(data={}) {
    const jobs = {
      title: data.name,
      minSalary: data.minSalary,
      hasEquity: data.hasEquity,
    }

    let res;
    if (jobs.title === "") {
      res = await this.request('jobs')
    } else {
      res = await this.request('jobs', jobs)
    }
    console.log("this is res in getJobsWithFilter", res.jobs)

    return res.jobs
  }

  /**TODO. Add function to update user  */

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;