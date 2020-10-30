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
    console.debug("API Call:", "API endpoint:", endpoint, "API data:", data, "API method:", method);

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

  static async getCompanies(data = {}) {

    const searchParams = {
      minEmployees: data.minEmployees || undefined,
      maxEmployees: data.maxEmployees || undefined,
      name: data.searchTerm || undefined
    }

    const res = await this.request('companies', searchParams)
    console.debug("api.js getCompanies", res.companies)

    return res.companies
  }


  /** Get job details by id 
  */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`)
    return res.job;
  }


  /** Get job based on search parameters given, 
   * if none given, return all jobs.
   */
  static async getJobs(data = {}) {
    const searchJobParams = {
      title: data.searchTerm || undefined,
      minSalary: data.minSalary || undefined,
      hasEquity: data.hasEquity || undefined,
    }

    const res = await this.request('jobs', searchJobParams)
    return res.jobs
  }

  /** Handle login, get user token via form inputs: username, password */
  // old function name: getToken()
  static async login(data) {
    console.log("this is Jobly.API login data", data)
    const res = await this.request("auth/token", data, "post")

    console.debug("this is login data result should be token", res.token)

    return res.token
  }



  /**Get user details. Returns an object */
  static async getUser(username) {
    console.debug("this is data in getUser", username)

    const res = await this.request(`users/${username}`)
    console.debug("this is data getUser in res", res.user)
    return res.user;
  }

  /**Register and create user. Oldname: registerUser()*/
  static async signup(data) {
    const newUser = {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    const userCreated = await this.request("auth/register", newUser, "post")

    return userCreated.token
  }

  /** another way to handle register user */
  // static async signup(userData) {
  //   let res = await this.request("auth/register", userData, "post")
  //   return res.token
  // }

  /* Apply to job */
  static async applyToJobs(username, id){
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

}



export default JoblyApi;