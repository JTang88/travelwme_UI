import React from 'react';
import { Typography, Grid, withStyles, Button } from '@material-ui/core';
import TripStatusButton from './TripStatusButton';
import CancelOrLeaveButton from './CancelOrLeaveButton';
import AskToJoinButton from './AskToJoinButton';
import ForSureGoingButton from './ForSureGoingButton';
import './index.css';

const styles = {
  root: {
    display: 'inline-block',
    marginRight: 20,
    marginLeft: 5,
  },
  numberSubs: {
    marginTop: 13,
  },
  joined: {
    marginTop: 13,
    // marginLeft: 5,
  },
  fsgStyle: {
    marginTop: 13,
    // marginLeft: 0,
    // marginRight: 100,
  },
  button: {
    border: '2px solid #00cec9',
    margin: 5,
    color: 'white',
  },
};

const TripDetails = ({
  classes: {
    root,
    button,
    numberSubs,
    joined,
    fsgStyle,
  },
  user: {
    id: userId,
    username,
  },
  trip: {
    id: tripId,
    title,
    interesters,
    joiners,
    forSureGoing: fsg,
    countries,
    age_start,
    age_end,
    date_start,
    date_end,
    gender,
    trip_keywords,
    relationship,
    trip_status,
    cost,
    creator: {
      id: creatorId,
    },
  },
  currentMember: {
    id: memberId,
    forSureGoing,
  },
  currentUserType,
  tripType,
}) => (
  <div>
    <Grid container>
      <Grid item md={8}>
        <Typography
          className={root}
          variant="display3"
          color="inherit"
        >
          {title}
        </Typography> 
        <Typography
          className={root}
          variant="body2"
          color="inherit"
        >
          {`${date_start} - ${date_end}`}
        </Typography> 
        <div className="detail-list-container"> 
          <Typography 
            className={root} 
            variant="body2" 
            color="inherit"
          > 
            {`Country • ${JSON.parse(countries).join(' ')}`}
          </Typography>
          <Typography 
            className={root} 
            variant="body2" 
            color="inherit"
          >
            {`Age •  ${age_start} ~ ${age_end}`}
          </Typography>
          <Typography 
            className={root} 
            variant="body2" 
            color="inherit"
          >
            {` Gender •  ${gender}`}
          </Typography>
          <Typography 
            className={root} 
            variant="body2" 
            color="inherit"
          >
            {` Relationship •  ${relationship}`}
          </Typography>
          <Typography 
            className={root} 
            variant="body2" 
            color="inherit"
          > 
            {` Cost •  ${cost}`}
          </Typography>
          <Typography 
            className={root} 
            variant="body2" 
            color="inherit"
          >
            {` Status •  ${trip_status}`}            
          </Typography>
        </div>
        {
          JSON.parse(trip_keywords).map(keyword => (
            <Button
              className={button}
              variant="outlined"
              size="small"
            >
              {keyword}
            </Button>
          ))
        }
      </Grid>
      <Grid item md={4}>
        <Grid container alignContent="center">
          <Grid item sm={4} alignItems="center">
            <Typography
              color="inherit"
              variant="display3"
            >
              {interesters}
            </Typography>
            <Typography
              className={numberSubs}
              color="inherit"
              variant="body2"
            >
              interested
            </Typography>
          </Grid>
          <Grid item sm={4} alignItems="center">
            <Typography
              color="inherit"
              variant="display3"
            >
              {joiners}
            </Typography> 
            <Typography
              className={joined}
              color="inherit"
              variant="body2"
            >
              joined
            </Typography>         
          </Grid>
          <Grid item sm={4}>
            <Typography
              color="inherit"
              variant="display3"
            >
              {fsg}
            </Typography> 
            <Typography
              className={fsgStyle}
              color="inherit"
              variant="body2"
            >
              For Sure Going
            </Typography>
          </Grid>
        </Grid>
        {
          currentUserType === 'C' ? 
            <TripStatusButton 
              currentStatus={trip_status} 
              id={tripId}  
            /> :                   
          currentUserType === 'J' && !forSureGoing ? 
            <div className="trippic">
              <CancelOrLeaveButton
                tripType="joined" 
                memberId={memberId}
                tripId={tripId}
                userId={userId}
              >
                Leave this Trip
              </CancelOrLeaveButton>
                let the world know that you are for sure going
              <ForSureGoingButton 
                memberId={memberId}
                tripId={tripId}
                userId={userId}
                tripType="joined'"
              />
            </div> :
          currentUserType === 'I' ? 
            <div className="trippic">
              <CancelOrLeaveButton
                tripType="waiting"
                memberId={memberId}
                tripId={tripId}
                userId={userId}
              >
                Leave this Trip
              </CancelOrLeaveButton>
            </div> :
          currentUserType === 'N' ?
            <div className="trippic">
              <AskToJoinButton
                senderName={username}
                creatorId={creatorId}
                tripTitle={title}
                userId={userId}
                tripId={tripId}
                tripType={tripType}
              />
            </div> : 'You are for sure going on this trip!'
        }
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(TripDetails);


/* <div className="col-4 trippic">
  <Typography
    className={root}
    variant="display3"
    color="inherit"
  >
    {title}
  </Typography>
  <Typography
    className={root}
    variant="body2"
    color="inherit"
  >
    {`${date_start} - ${date_end}`}
  </Typography>
  <div className="detail-list-container">
    <div className="flag-container">
      <ion-icon name="flag" />
    </div>
    <Typography
      className={root}
      variant="body2"
      color="inherit"
    >
      {JSON.parse(countries).join(' ')}
    </Typography>
    <Cake className={icon} />
    <Typography
      className={root}
      variant="body2"
      color="inherit"
    >
      {`${age_start} ~ ${age_end}`}
    </Typography>
    <div className="gender-container">
      <ion-icon name="female" />
      <ion-icon name="male" />
    </div>
    <Typography className={root} variant="body2" color="inherit">{gender}</Typography>
    <div className="heart-container">
      <ion-icon name="heart-dislike" />
    </div>
    <Typography
      className={root}
      variant="body2"
      color="inherit"
    >
      {relationship}
    </Typography>
    <AttachMoney className={icon} />
    <Typography
      className={root}
      variant="body2"
      color="inherit"
    >
      {cost}
    </Typography>
    <Typography
      className={root}
      variant="body2"
      color="inherit"
    >
      Status: {trip_status}
    </Typography>
  </div> */