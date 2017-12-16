import React from 'react';
import { connect } from 'react-redux';

function Travelers(props) {
  let tripCreator;
  let tripJoined;
  for (let i = 0; i < props.travelers.length; i++) {
    if (props.travelers[i].user_type === 'C') {
      tripCreator = (<div>Creator: {props.travelers[i].username}</div>);
    } else {
      tripJoined = (<div>{props.travelers[i].username}</div>);
    }
  }

  console.log('TRAVELERSSSSS', props.travelers);
  return (
    <div>
      {tripCreator}
      <h2>Joined</h2>
      {tripJoined}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    mytrip: state.mytrip,
    userid: state.userid,
    travelers: state.travelers,
  };
}

export default connect(mapStateToProps)(Travelers);
