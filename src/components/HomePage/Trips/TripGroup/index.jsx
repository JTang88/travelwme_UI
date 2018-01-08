import React from 'react';
import Travelers from '../TripGroup/Travelers';
import TripSuggestions from '../TripGroup/TripSuggestions';
import TripDetails from '../TripInfo/TripDetails';
import ApproveTrav from '../TripGroup/ApproveTravelers';
import TripStatus from '../TripGroup/TripStatus';

function TripGroup() {
  return (
    <div>
      <Travelers />
      <ApproveTrav />
      <TripDetails />
      <TripStatus />
    </div>
  );
}


export default TripGroup;
