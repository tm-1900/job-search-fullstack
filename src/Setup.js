import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from "./Nav";
import DogList from "./DogList";

/*

App --> Jobly ---> List --->{Companies, Jobs} --> {CompanyDetail, JobDetail}
                  List --> Company --> CompanyJobsList --> {JobDetail}
        Jobly ---> Auth Form (one form) --->{Login Form, Register Form}
        Jobly --> Profile Form --> {userDetail & show form}

    --> Navbar (Company, Job, Profile, username, Logout) 

  Jobly:
    state: 
      - companies [{name, description, num_employees},....]
      - jobs [{name, salary, equity}, ...]
      - [user, setUser]= useState({name, firstname, lastname})
      - isLogin, isRegister


    function: CreateUser(), 
              getRequest() axios request to get list of companies/jobs based search query

  List: 
    props: list of companies or job list depending route "/jobs" or "/companies"
    -getRequest 

  
  CompanyJobsList:
    - props: 1 single company
            - list of jobs for that single company

  CompanyDetail:
    - show info about single company

  JobsDetails:
    - show info about single job

  Auth Form:
    - prop: True/False, 
      - createUser(), 
      - login() maybe?
    - if go to "/login" then render AuthForm (with username, password)
    - if go to "/register" then render AuthRom (with name, first, last..email)
    - take in form inputs, setUserDetail() ---> send info to the parent (Jobly)

    -handleSubmit()

  Profile Form:
    - props: user info
      -setUserDetail()
    - Save, take info and send back to parent to setUserDetail()

    
const fakeCompany = {
    "handle": "anderson-arias-morrow",
    "name": "Anderson, Arias and Morrow",
    "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
    "numEmployees": 245,
    "logoUrl": "/logos/logo3.png",
    "jobs": [
      {
        "id": 7,
        "title": "Technical brewer",
        "salary": 157000,
        "equity": "0"
      },
      {
        "id": 18,
        "title": "Embryologist, clinical",
        "salary": 138000,
        "equity": "0"
      },
      {
        "id": 62,
        "title": "Art gallery manager",
        "salary": null,
        "equity": "0.085"
      },
      {
        "id": 95,
        "title": "Writer",
        "salary": 172000,
        "equity": "0.091"
      },
      {
        "id": 119,
        "title": "Oceanographer",
        "salary": null,
        "equity": "0.097"
      },
      {
        "id": 127,
        "title": "Glass blower/designer",
        "salary": 126000,
        "equity": "0.099"
      }
    ]
  }

*/


