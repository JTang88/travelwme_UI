import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyTrip from './MyTrip/index';
import NavBar from './NavBar';
import PlanTrip from './PlanTrip';
import SearchTrip from './SearchTrip';
import Profile from './Profile';

function HomePage() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/homepage/plantrip" component={PlanTrip} />
        <Route path="/homepage/searchtrip" component={SearchTrip} />
        <Route path="/homepage/mytrip" component={MyTrip} />
        <Route path="/homepage/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default HomePage;
