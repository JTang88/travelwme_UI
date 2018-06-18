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
    size: 'small',
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
  <div style={{ paddingRight: 30 }}>
    <div className="left-grid">
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
    </div>
    <div className='right-grid'>
      <div className="counter-warper">
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
      </div>
      <div className="counter-warper">
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
      </div>
      <div className="counter-warper">
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
      </div>
      {
        currentUserType === 'C' ?
          <div className="condition-button">
            <TripStatusButton
              currentStatus={trip_status}
              id={tripId}
            /> 
          </div> :
          currentUserType === 'J' && !forSureGoing ?
            <div>
              <div className="condition-button">
                <ForSureGoingButton
                  memberId={memberId}
                  tripId={tripId}
                  userId={userId}
                  tripType="joined'"
                />
              </div>
              <div className="second-button">
                <CancelOrLeaveButton
                  tripType="joined"
                  memberId={memberId}
                  tripId={tripId}
                  userId={userId}
                >
                  Leave this Trip
                </CancelOrLeaveButton>
              </div>
            </div> :
            currentUserType === 'I' ?
              <div className="condition-button">
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
                <div className="condition-button">
                  <AskToJoinButton
                    senderName={username}
                    creatorId={creatorId}
                    tripTitle={title}
                    userId={userId}
                    tripId={tripId}
                    tripType={tripType}
                  />
                </div> : 
                <div className="for-sure-subs">
                  <Typography
                    variant="title"
                    color="inherit"
                  >
                    You Are for Sure Going!
                  </Typography >
                </div>    
        }
    </div>
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