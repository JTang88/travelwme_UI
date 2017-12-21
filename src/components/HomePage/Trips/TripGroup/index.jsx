import React from 'react';
import Travelers from '../TripGroup/Travelers';
import TripSuggestions from '../TripGroup/TripSuggestions';
import TripDetails from '../TripInfo/TripDetails';
import ApproveTrav from '../TripGroup/ApproveTravelers';
import TripStatus from '../TripGroup/TripStatus';

function TripGroup() {
  return (
    <div>
      <h1>Trip Group</h1>
      <Travelers />
      <div className="row">
        <div className="col-8">
          <TripDetails />
        </div>
        <div className="col-4">
          <TripSuggestions />
          <ApproveTrav />
        </div>
        <TripStatus />
      </div>
    </div>
  );
}


export default TripGroup;
