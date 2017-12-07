import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TripInfo from './TripInfo';

function MyTrip() {
  return (
    <div>
      <Switch>
        <Route path="/mytrip/tripinfo" component={TripInfo} />
      </Switch>
    </div>
  );
}

export default MyTrip;

// mytrip component and add trending trip component routing to trip info
