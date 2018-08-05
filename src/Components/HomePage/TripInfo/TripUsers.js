import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import UserCard from '../TripInfo/UserCard';

const TripUsers = ({
  joiners,
  interesters,
  trip,
  currentUserType,
}) => (
  <div className="trip-users-container">
    <Typography variant="title" color="inherit" gutterBottom>
      Joined :
    </Typography>
    <Grid container>
      {joiners.map((joiner, i) => (
        <Grid item sm={3} key={`joiner${i}`}>
          <UserCard
            trip={trip}
            key={joiner.user.id}
            member={joiner}
          />
        </Grid>
      ))}
    </Grid>
    <div className="ineresters-container">
      <Typography variant="title" color="inherit" gutterBottom>
        Interested :
      </Typography>
        <Grid container>
        {interesters.map((interester, i) => (
          <Grid item sm={3} key={`interester${i}`}>
            <UserCard
              trip={trip}
              key={interester.user.id}
              member={interester}
              creatorView={currentUserType === 'C'}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
);

export default (TripUsers);

