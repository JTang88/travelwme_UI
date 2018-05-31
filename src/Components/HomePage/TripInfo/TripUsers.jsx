import React from 'react';
import UserCard from '../TripInfo/UserCard';

const TripUsers = props => (
  <div>
    <div className="tripsub">Joined</div>
    <div className="row">
      {props.joiners.map((joiner, i) => (
        <div className="col-4" key={`joiner${i}`}>
          <UserCard 
            key={joiner.user.id} 
            member={joiner} 
          /> 
        </div>))}
    </div>
    <div className="tripsub">Interested</div>
    <div className="row">
      {props.interesters.map((interester, i) => (
        <div className="col-4" key={`interest${i}`}>
          <UserCard 
            trip={props.trip}
            tripId={props.tripId}
            key={interester.user.id} 
            member={interester} 
            creatorView={props.currentUser === 'C'}
          />
        </div>))}
    </div>
  </div>
);

export default (TripUsers);

