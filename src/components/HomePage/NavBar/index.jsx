import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <h1 className="text-center">Travel With Me</h1>
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded justify-content-center">
        <div className="navbar-nav">
          <Link to="/homepage" href="/homepage" className="nav-item nav-link">Home</Link>
          <Link to="/home" href="/home" className="nav-item nav-link">Plan Trip</Link>
          <Link to="/home" href="/home" className="nav-item nav-link">Search Trip</Link>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Trips
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo" className="dropdown-item">Created</Link>
              <Link to="/home" href="/home" className="dropdown-item">Interested</Link>
              <Link to="/home" href="/home"className="dropdown-item">Joined</Link>
            </div>
          </li>

          <Link to="/home" href="/home" className="nav-item nav-link">Profile</Link>
          <Link to="/home" href="/home" className="nav-item nav-link">Sign Out</Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
