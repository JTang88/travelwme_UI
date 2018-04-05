import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import TripInfo from '../Global/Recipes/TripList/TripInfo';
import Created from '../HomePage/Trips/Created';
import Joined from '../HomePage/Trips/Joined';
import Waiting from '../HomePage/Trips/Waiting';
import Going from '../HomePage/Trips/Going';
import PlanTrip from './PlanTrip';
import SearchTrips from './SearchTrips';
import FoundTrips from './SearchTrips/FoundTrips';
import Profile from '../Global/Recipes/Profile';
import TrendTrips from './TrendTrips';
import Settings from './Settings';


function HomePage() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/homepage" component={TrendTrips} />
        <Route path="/homepage/:tripType/tripinfo/:id" component={TripInfo} />
        <Route path="/homepage/created" component={Created} />
        <Route path="/homepage/joined" component={Joined} />
        <Route path="/homepage/waiting" component={Waiting} />
        <Route path="/homepage/going" component={Going} />
        <Route path="/homepage/settings" component={Settings} />
        <Route exact path="/homepage/searchtrips" component={SearchTrips} />
        <Route path="/homepage/foundtrips" component={FoundTrips} />
        <Route path="/homepage/plantrip" component={PlanTrip} />
        <Route exact path="/homepage/profile/" component={Profile} />
        <Route path="/homepage/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default HomePage;
