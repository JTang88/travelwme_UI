import React from 'react';
import TripStatusButton from './TripStatusButton';
import CancelOrLeaveButton from './CancelOrLeaveButton';
import AskToJoinButton from './AskToJoinButton';
import ForSureGoingButton from './ForSureGoingButton';


const TripDetails = ({
  user: {
    id: userId,
    username,
  },
  trip: {
    id: tripId,
    title,
    countries,
    age_start,
    age_end,
    date_start,
    date_end,
    gender,
    trip_keywords,
    body_types,
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
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-4 trippic">
          <h4>Country: {JSON.parse(countries).join(' ')}</h4>
          <h4>Age start: {age_start}</h4>
          <h4>Age end: {age_end}</h4>
          <h4>Start Date: {date_start}</h4>  
          <h4>End Date: {date_end}</h4>
          <h4>Gender: {gender}</h4>
          <h4>Trip Keywokds: {trip_keywords}</h4>
          <h4>Trip BodyTypes: {body_types}</h4>
          <h4>Relationship: {relationship}</h4>
          <h4>Trip Status: {trip_status}</h4>
          <h4>Cost: {cost}</h4>
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
        </div>
      </div>
    </div>
  );
};

export default TripDetails;