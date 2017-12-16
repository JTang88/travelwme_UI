import React from 'react';
import { connect } from 'react-redux';

function Travelers(props) {
  console.log('TRAVELERSSSSS', props.travelers);
  return (
    <div>
      <h2>Joined</h2>
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
