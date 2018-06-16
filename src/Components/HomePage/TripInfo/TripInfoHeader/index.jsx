import React from 'react';
import TripDetails from './TripDetails';
import { Typography, Grid } from '@material-ui/core';
import './index.css';

const TripInfoHeader = ({ 
  trip,
  currentUserType, 
  user,
  currentMember, 
  tripType, 
}) => (
  <header className="trip-info-header" >
    <TripDetails
      trip={trip}
      currentUserType={currentUserType} 
      user={user}
      currentMember={currentMember}
      tripType={tripType}
    />
  </header >
);

export default TripInfoHeader;