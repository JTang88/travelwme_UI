import React from 'react';
import Travelers from '../TripGroup/Travelers';
import TripSuggestions from '../TripGroup/TripSuggestions';
import TripDetails from '../TripInfo/TripDetails';
import ApproveTrav from '../TripGroup/ApproveTravelers';

function TripGroup() {
  return (
    <div>
      <h1>Trip Group</h1>
      <Travelers />
      <TripDetails />
      <div className="d-flex justify-content-around">
        <TripSuggestions />
        <ApproveTrav />
      </div>  
    </div>
  );
}


export default TripGroup;
