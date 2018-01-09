import React from 'react';
import Travelers from '../TripGroup/Travelers';
import TripSuggestions from '../TripGroup/TripSuggestions';
import TripDetails from '../TripInfo/TripDetails';
import ApproveTrav from '../TripGroup/ApproveTravelers';

function TripGroup() {
  return (
    <div>
      <TripDetails />
      <Travelers />
      <ApproveTrav />
    </div>
  );
}


export default TripGroup;
