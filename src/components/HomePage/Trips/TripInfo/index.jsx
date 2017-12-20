import React from 'react';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';
import JoinTrip from './JoinTrip';


function TripInfo() {
  return (
    <div className="row">
      <div className="col-8">
        <TripDetails />
      </div>
      <div className="col-4">
        <TripUsers />
      </div>
      <JoinTrip />
    </div>
  );
}

export default (TripInfo);
