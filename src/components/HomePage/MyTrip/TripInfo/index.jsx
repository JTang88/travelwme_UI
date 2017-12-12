import React from 'react';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';

function TripInfo() {
  return (
    <div>
      <h3>TRIP INFO</h3>
      <TripDetails />
      <TripUsers />
    </div>
  );
}

export default TripInfo;
