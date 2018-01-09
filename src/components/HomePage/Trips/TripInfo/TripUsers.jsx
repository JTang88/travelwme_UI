import React from 'react';
import { connect } from 'react-redux';
import UserCard from '../TripInfo/UserCard';
import JoinTrip from './JoinTrip';


function TripUsers(props) {
  return (
    <div>
      <div className="tripsub">Creator</div>
      <div className="row">
        <UserCard user={props.creator} />
      </div>
      <div className="tripsub">Joined</div>
      <div className="row">
        {props.triptrav.map(user => (
          <div className="col-4">
            <UserCard key={user.user.id} user={user} /> 
          </div>))}
      </div>
      <div className="tripsub">Interested</div>
      <div className="row">
        {props.tripint.map(user => (
          <div className="col-4">
            <UserCard key={user.user.id} user={user} />
          </div>))}
      </div>
      <div className="trippic">
        <JoinTrip />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    showtrip: state.showtrip,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

export default connect(mapStateToProps)(TripUsers);
