import React from 'react';
import UserCard from '../TripInfo/UserCard';

const TripUsers = props => (
  <div>
    <div className="tripsub">Joined</div>
    <div className="row">
      {props.joiners.map(joiner => (
        <div className="col-4">
          <UserCard 
            key={joiner.user.id} 
            member={joiner} 
          /> 
        </div>))}
    </div>
    <div className="tripsub">Interested</div>
    <div className="row">
      {props.interesters.map(interester => (
        <div className="col-4">
          <UserCard 
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

