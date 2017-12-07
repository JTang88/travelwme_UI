import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import MyTrip from './MyTrip/index';
import NavBar from './NavBar';


function HomePage() {
  return (
    <div>
      <NavBar />
      <MyTrip />
    </div>
  );
}

export default HomePage;
