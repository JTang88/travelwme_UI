import React from 'react';
import { connect } from 'react-redux';

function TripDetails(props) {
  return (
    <div>
      <h2>Trip Details</h2>
      <h3>Title: {props.showtrip.title}</h3>
      <h4>Start Date: {props.showtrip.date_start.slice(4, 15)}</h4>
      <h4>End Date: {props.showtrip.date_end.slice(4, 15)}</h4>
      <h4>Fitness: {props.showtrip.fitness}</h4>
      <h4>Trip Status: {props.showtrip.trip_state}</h4>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    showtrip: state.showtrip,
  };
}

export default connect(mapStateToProps)(TripDetails);
