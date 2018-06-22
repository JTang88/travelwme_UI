import React from 'react';
import { Typography } from '@material-ui/core';
import './index.css';

const GeneralHeader = ({ children }) => (
  <header className="general-header" >
    <Typography variant="title" color="inherit">
      {children}
    </Typography>
  </header >
);

export default GeneralHeader;