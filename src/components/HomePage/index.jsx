import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Trips from './Trips/index';
import NavBar from './NavBar';
import TripInfo from '../Global/Recipes/TripList/TripInfo';
import Created from '../HomePage/Trips/Created';
import Joined from '../HomePage/Trips/Joined';
import Waiting from '../HomePage/Trips/Waiting';
import Going from '../HomePage/Trips/Going';
// import PlanTrip from './PlanTrip';
import SearchTrips from './SearchTrips';
import FoundTrips from './SearchTrips/FoundTrips';
// import Profile from './Profile';
import TrendTrips from './TrendTrips';


function HomePage() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/homepage" component={TrendTrips} />
        <Route path="/homepage/trips/tripinfo/:id" component={TripInfo} />
        <Route path="/homepage/trips/created" component={Created} />
        <Route path="/homepage/trips/joined" component={Joined} />
        <Route path="/homepage/trips/waiting" component={Waiting} />
        <Route path="/homepage/trips/going" component={Going} />
        <Route exact path="/homepage/searchtrips" component={SearchTrips} />
        <Route path="/homepage/searchtrips/foundtrips" component={FoundTrips} />
        {/* <Route path="/homepage/plantrip" component={PlanTrip} /> */}
        {/* <Route path="/homepage/trips" component={Trips} /> */}
        {/* <Route path="/homepage/profile" component={Profile} /> */}
      </Switch>
    </div>
  );
}

export default HomePage;
