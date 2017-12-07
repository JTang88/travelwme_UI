import React from 'react';
// import MyTrip from './MyTrip/index';


function Homepage() {
  return (
    <div>
      <h3>HOMEPAGE</h3>
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <h1 className="navbar-brand">Travel With Me</h1>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="#">Plan Trip</a>
            <a className="nav-item nav-link" href="#">Search Trip</a>
            <a className="nav-item nav-link" href="#">Profile</a>
            <a className="nav-item nav-link" href="#">Sign Out</a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Homepage;
