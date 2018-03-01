import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import MyTrips from './MyTrips';
// import PendingTrips from './PendingTrips';
import TripInfo from './TripInfo';
// import TripGroup from './TripGroup';


function Trips() {
  return (
    <div>
      <Switch>
        {/* <Route path="/homepage/trips/mytrips" component={MyTrips} />
        <Route path="/homepage/trips/pending" component={PendingTrips} /> */}
        <Route path="/homepage/trips/tripinfo/:id" component={TripInfo} />
        {/* <Route path="/homepage/trips/tripgroup" component={TripGroup} /> */}
      </Switch>
    </div>
  );
}


export default Trips;
