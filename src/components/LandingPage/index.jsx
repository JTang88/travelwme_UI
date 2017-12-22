import React, { Component } from 'react';
import {
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

const Landing = () => (
    <div className="landimg">
        <div className="pos-f-t">
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-inverse p-4">
            <Link to="/login">
              <h4 className="text-white">Login</h4>
            </Link>   
            <Link to="/sign"> 
              <h4 className="text-white signbtt">Signup</h4>
            </Link>  
            </div>
          </div>
          <nav className="navbar navbar-inverse bg-inverse">
            <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
        </div>
          <h1 className="text-center title">
            Travel With Me
          </h1>
          <div className="text-center desc">
            Why travel alone?
            Find awesome people to go on your next adventure!
          </div>

      <Route path="/login" component={Login} />
      <Route path="/sign" component={Signup} />
      {/* <PrivateRoute path="/homepage" component={Homepage}/> */}
    </div>
);

export default Landing;
