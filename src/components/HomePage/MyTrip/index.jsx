import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TripInfo from './TripInfo';
import TripGroup from './TripGroup';

function MyTrip() {
  return (
    <div>
      <Switch>
        <Route path="/homepage/mytrip/tripinfo" component={TripInfo} />
        <Route path="/homepage/mytrip/tripgroup" component={TripGroup} />
      </Switch>
    </div>
  );
}

export default MyTrip;

// mytrip component and add trending trip component routing to trip info
