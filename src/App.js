import React from 'react';
import './App.css';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.css";

function App() {
    //add token as state
    //state for currentUser

    //useEffect get backend info and store token

  return (
    <div className="App">
      {/* <nav class="Navigation navbar navbar-expand-md"> */}
      <Routes />
      {/* </nav> */}
    </div>
  );
}

export default App;
