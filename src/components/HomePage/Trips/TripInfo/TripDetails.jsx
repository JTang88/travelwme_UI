import React from 'react';
import { connect } from 'react-redux';

function TripDetails(props) {
  console.log('TRIPDETAILS', props.mytrip)
  return (
    <div>
      <h2>Trip Details</h2>
      <hr />
      <h3>{props.mytrip.title}</h3>
      <h4>{props.mytrip.date_start.slice(4, 15)}</h4>
      <h4>{props.mytrip.date_end.slice(4, 15)}</h4>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    mytrip: state.mytrip,
  };
}

export default connect(mapStateToProps)(TripDetails);
