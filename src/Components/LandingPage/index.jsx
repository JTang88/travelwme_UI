import React, { Fragment } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { Link, Redirect,  } from 'react-router-dom';
import checkAuth from '../../services/checkAuth';
import './landing.css';

const Landing = () => (
  checkAuth() ? <Redirect to={{ pathname: '/homepage' }} /> : 
  <div className="landing">
    <div className="landing-nav">
      <Button variant="text" size="large" color="inherit">
          about
      </Button>
      <Button variant="text" size="large" color="inherit" >
          blog
      </Button>
      <Button variant="text" size="large" color="inherit">
          sign up
      </Button>
      <Button variant="text" size="large" color="inherit" >
        log in
      </Button>
    </div>
    <div className="clearfix" />
    {/* <div>
      <Link href="/login" to="/login">
        <h4>Login</h4>
      </Link>   
      <Link href="/sign" to="/sign"> 
        <h4>Signup</h4>
      </Link>  
    </div> */}
    <div className="landing-text-container">
      <Typography variant="display3" gutterBottom color="inherit">
        <strong>
          Going on a #Adventure <br />
          Experience the World <br />
          Making Friends of a Life Time
        </strong>
      </Typography>
    </div>
    <div className="center-button">
      <div className="btn-full">
        Log in
      </div>
      <div className="btn-ghost"> Sign up </div>
      {/* <div>
        <Button size="large" variant="outlined" color="inherit">
          Sign Up
        </Button>
      </div>
      <div>
        <Button size="large" variant="outlined" color="inherit">
          Log In
        </Button>  
      </div> */}
    </div>
  </div>
);

export default Landing;
