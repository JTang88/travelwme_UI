import React from 'react';
import { Typography } from '@material-ui/core';
import './tripListHeader.css';

const TripListHeader = ({ title, children }) => {
  return (
    <div className="list-header-container">
      <header className="list-header">
        <Typography
          variant="title"
          color="inherit"
        >
          {title}
        </Typography>
      </header>
      <div className="list-title-container">
        <Typography
          variant="body2"
          color="inherit"
        >
          {children}
        </Typography>
      </div>
    </div>
  );
};

export default TripListHeader;