import React from 'react';
import { connect } from 'react-redux';

function TripDetails(props) {
  console.log('TRIPDETAILS', props.mytrip)
  return (
    <div>
      <h2>Trip Details</h2>
      <hr />
      <h3>Title: {props.mytrip.title}</h3>
      <h4>Start Date: {props.mytrip.date_start.slice(4, 15)}</h4>
      <h4>End Date: {props.mytrip.date_end.slice(4, 15)}</h4>
      <h4>Fitness: {props.mytrip.fitness}</h4>
      <h4>Trip Status: {props.mytrip.trip_state}</h4>
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
