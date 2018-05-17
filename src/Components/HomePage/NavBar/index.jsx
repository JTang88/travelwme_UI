import React from 'react';
import { Link } from 'react-router-dom';
import UserBox from './UserBox';
import Notifications from './Notifications';

const NavBar = () => (
  <div>
    <h1 className="text-center">Travel With Me</h1>
    <UserBox />
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded justify-content-center">
      <div className="navbar-nav">
        <Link to="/homepage" href="/homepage" className="nav-item nav-link">Home</Link>
        <Link to="/homepage/plantrip" href="/homepage/plantrip" className="nav-item nav-link">Plan Trip</Link>
        <Link to="/homepage/searchtrips" href="/homepage/searchtrips" className="nav-item nav-link">Search Trip</Link>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/homepage/mytrip" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Trips
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link to="/homepage/created" href="/homepage/created" className="dropdown-item">Created</Link>
            <Link to="/homepage/joined" href="/homepage/joined" className="dropdown-item">Joined</Link>
            <Link to="/homepage/waiting" href="/homepage/waiting" className="dropdown-item">Waiting</Link>
            <Link to="/homepage/going" href="/homepage/going" className="dropdown-item">Going</Link>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link" href="/homepage/mytrip" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Notifications
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Notifications />
          </div>
        </li>
      </div>
    </nav>
  </div>
);
 
export default NavBar;