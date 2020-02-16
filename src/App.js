import React, { Component } from "react";
import "./App.css";
import Login from './Login';
import Register from './Register';
import AdRegister from './Adminreg';
import { Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route exact path="/Register" component={Register} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/AdRegister" component={AdRegister} />
    </div>
  );
}

export default App;