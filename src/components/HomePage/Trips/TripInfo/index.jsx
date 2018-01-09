import React from 'react';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';


function TripInfo() {
  return (
    <div>
      <TripDetails />
      <div className="trippic">
        <TripUsers />
      </div>
    </div>
  );
}

export default (TripInfo);
