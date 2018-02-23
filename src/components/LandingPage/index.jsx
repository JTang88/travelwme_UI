import React from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';
import checkAuth from '../../services/checkAuth';

const Landing = () => (
  checkAuth() ? <Redirect to={{ pathname: '/homepage' }} /> : 
  <div className="landimg">
    <div className="pos-f-t">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-inverse p-4">
          <Link href="/login" to="/login">
            <h4 className="text-white">Login</h4>
          </Link>   
          <Link href="/sign" to="/sign"> 
            <h4 className="text-white signbtt">Signup</h4>
          </Link>  
        </div>
      </div>
      <nav className="navbar navbar-inverse bg-inverse">
        <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
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
  </div>
);

export default Landing;
