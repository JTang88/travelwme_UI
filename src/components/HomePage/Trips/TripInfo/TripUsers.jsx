import React from 'react';
import { connect } from 'react-redux';

function TripUsers(props) {
  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Creator</h4>
        <div>{props.creator.user.username}</div>
      </div>
      <div className="col-md-12">
        <h4>Joined</h4>
        {props.triptrav.map(user => (<div key={user.user.id}>{user.user.username}</div>))}
      </div>
      <div className="col-md-12">
        <h4>Interested</h4>
        {props.tripint.map(user => (<div key={user.user.id}>{user.user.username}</div>))}
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
